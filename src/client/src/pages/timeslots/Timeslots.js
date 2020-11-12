import React from 'react'
import {
    BootstrapTable,
    ButtonGroup,
    DeleteButton,
    InsertButton,
    InsertModalFooter,
    InsertModalHeader,
    SearchField,
    TableHeaderColumn
} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import $ from 'jquery';
import Alert from 'react-s-alert';
import TimeEditor from "../calendar/TimeEditor";
import TimeInputField from "./TimeInputField";

class TimeSlots extends React.Component {
    constructor(props) {
        super(props);
        this.getData();
        this.state = {
            data: [],
            editMode: false,
            deletedRows: []
        };
    }

    getData() {
        $.ajax({
            method: "GET",
            url: "/TimeSlot/all",
            type: "json",
            contentType: "application/json",
            success: (response) => {
                this.setState({
                    data: response
                });
            }
        }).catch(function (xhr, status, error) {
            Alert.error('Unable to load table data.', {
                position: 'top-right',
                effect: 'stackslide',
                timeout: 2000
            });

            this.setState({
                data: []
            });
        });
    }

    addRowHook(row) {
        // Clear our the id field since the backend will auto generate one for us
        row.id = null;
        row.isNew = true;
        this.addRowAjaxCall(row);
    }

    // We use this call here when we do not want to delete the row id
    addRowAjaxCall(row) {
        const data = this.state.data;

        $.ajax({
            method: "POST",
            url: "/TimeSlot/saveTimeSlot",
            data: JSON.stringify(row),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                data.push(response);
                this.setState({
                    data: data
                });
                Alert.success("TimeSlot added.", {
                    position: 'top-right',
                    effect: 'stackslide',
                    timeout: 2000
                });
            }
        }).catch(function (xhr, status, error) {
            Alert.error("Error saving row.", {
                position: 'top-right',
                effect: 'stackslide',
                timeout: 2000
            });
        });
    }

    deleteRowHook(rowIdsToDelete) {
        const data = this.state.data;
        const rowsToDelete = data.filter((row) => rowIdsToDelete.includes(row.id));

        const currentDeletedRows = this.state.deletedRows;
        currentDeletedRows.push(rowsToDelete);

        this.setState({ deletedRows: currentDeletedRows });

        $.ajax({
            method: "POST",
            url: "/TimeSlot/deleteTimeSlot",
            data: JSON.stringify(rowIdsToDelete),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                this.setState({ data: data.filter((row) => !rowIdsToDelete.includes(row.id)) });

                Alert.success("Row(s) deleted.", {
                    position: 'top-right',
                    effect: 'stackslide',
                    timeout: 2000
                });
            }
        }).catch(function (xhr, status, error) {
            Alert.error("Error deleting row(s).", {
                position: 'top-right',
                effect: 'stackslide',
                timeout: 2000
            });
        });
    }

    beforeSaveHook(row, cellName, cellValue, done) {
        let mockRow = { ...row };
        mockRow[cellName] = cellValue;

        if (row[cellName] === mockRow[cellName]) {
            return true;
        }

        $.ajax({
            method: "POST",
            url: "/TimeSlot/saveTimeSlot",
            data: JSON.stringify(mockRow),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                done(true);
                Alert.success("Row updated.", {
                    position: 'top-right',
                    effect: 'stackslide',
                    timeout: 2000
                });
            }
        }).catch(function (xhr, status, error) {
            Alert.error("Error saving row.", {
                position: 'top-right',
                effect: 'stackslide',
                timeout: 2000
            });
            done(false);
        });

        return 1;
    }

    onConfirmDeleteRow(next, dropRowKeys) {
        next();
    }

    onUndo() {
        // When we undo, add back the deleted rows
        const deletedRows = this.state.deletedRows.pop();
        deletedRows.forEach((row) => this.addRowAjaxCall(row));
    }

    cannotBeEmptyValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        if (!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must be inserted';
            response.notification.title = 'Requested Value';
        }
        return response;
    }

    startTimeValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        const startTime = value.replace(":", ".").split(':')[0];
        const endTime = row["endTime"].replace(":", ".").split(':')[0];
        if(parseFloat(startTime) >= parseFloat(endTime)) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Start time must be before end time.';
            response.notification.title = 'Invalid Entry';
        }

        const cannotBeEmpty = this.cannotBeEmptyValidator(value, row);

        return cannotBeEmpty.isValid ? response : cannotBeEmpty;
    }

    endTimeValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        const endTime = value.replace(":", ".").split(':')[0];
        const startTime = row["startTime"].replace(":", ".").split(':')[0];
        if(parseFloat(startTime) >= parseFloat(endTime)) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Start time must be before end time.';
            response.notification.title = 'Invalid Entry';
        }

        const cannotBeEmpty = this.cannotBeEmptyValidator(value, row);

        return cannotBeEmpty.isValid ? response : cannotBeEmpty;
    }

    dateFormatter(value) {
        let isAm = true;
        if(!value) {
            return value;
        }
    
        let result = "";
        for(let i = 0; i < 5; i++) {
            result += value[i];
        }
    
        if((result.charAt(0) >= 1) && (result.charAt(1) >= 3)) {
            let tens = parseInt(result.charAt(0)) * 10;
            let ones = parseInt(result.charAt(1));
            let num = tens + ones;
            let val = num - 20;
            let str = num.toString();
            isAm = false;
        }
    
        if(isAm) {
            result += " AM";
            if (result.charAt(0) == 0) {
                result = result.substring(1);
            }
        }
        else {
            result += " PM";
            result = result.substring(1);
            result = result.charAt(0) - 2 + result.substring(1);
        }
    
        return result;
    }

    createCustomInsertButton = () => {
        return (
            <InsertButton
                btnText='Insert TimeSlot'
                btnContextual='btn-success'
                className='add-btn' />
        );
    };

    createCustomDeleteButton = () => {
        return (
            <DeleteButton
                btnText='Delete TimeSlot'
                btnContextual='btn-danger'
                className='delete-btn' />
        );
    };

    createCustomModalHeader = () => {
        return (
            <InsertModalHeader
                className='modal-header'
                title='Add TimeSlot' />
        );
    };

    handleModalClose(closeModal) {
        closeModal();
    };

    createCustomModalFooter = (closeModal) => {
        return (
            <InsertModalFooter
                className='modal-footer'
                closeBtnContextual='btn-light'
                saveBtnContextual='btn-success'
                closeBtnClass='modal-close-btn'
                saveBtnClass='modal-save-btn'
                onModalClose={ () => this.handleModalClose(closeModal) }/>
        );
    };

    createCustomButtonGroup = props => {
        return (
            <ButtonGroup sizeClass='btn-group-md'>
                {props.showSelectedOnlyBtn}
                {props.insertBtn}
                {props.deleteBtn}
                <button type='button'
                        className={`btn btn-info edit-mode-btn`}
                        onClick={() => this.setState({ editMode: !this.state.editMode })}>
                    {this.state.editMode ? "Exit Edit Mode" : "Edit Mode"}
                </button>
                {this.state.deletedRows.length > 0 ?
                    <button type='button'
                            className={`btn btn-warning undo-btn`}
                            onClick={this.onUndo.bind(this)}>
                        Undo Delete
                    </button> : null}
                <button type='button'
                        className={`btn btn-info edit-mode-btn`}
                        onClick={this.generateData.bind(this)}>
                    Generate Test Data
                </button>
            </ButtonGroup>
        );
    };

    generateData(){
        for(let i = 6; i < 19; i++){
            this.addRowHook({
                startTime: i + ":00:00",
                endTime: i+1 + ":00:00"
            })
        }
    }

    createCustomSearchField = () => {
        return (
            <SearchField
                className='search-field'
                style={{ height: 40, fontSize: 15 }} />
        );
    };

    customStartTimeField = ( column, attr, editorClass, ignoreEditable) => {
        return (
            <select className = {`${editorClass}`} {...attr}>
                <option key = {null} value = {null} selected>
                    Please Choose a Start Time ... 
                    </option> 
                    { this.state.data.map ((startTime) => (
                        <option key = {startTime["startTime"]} value = {startTime["id"]}>
                            {startTime["startTime"]}
                        </option>
                    ))
                    }
                    </select>
        );
    };

    customEndtimeField = ( column, attr, editorClass, ignoreEditable) => {
        return (
            <select className = {`${editorClass}`} {...attr}>
                <option key = {null} value = {null} selected>
                    Please Choose an End Time ... 
                    </option> 
                    { this.state.data.map ((endTime) => (
                        <option key = {endTime["endTime"]} value = {endTime["id"]}>
                            {endTime["endTime"]}
                        </option>
                    ))
                    }
                    </select>
        );
    };

    tableProps = {
        onAddRow: this.addRowHook.bind(this),
        onDeleteRow: this.deleteRowHook.bind(this),
        insertBtn: this.createCustomInsertButton,
        deleteBtn: this.createCustomDeleteButton,
        insertModalHeader: this.createCustomModalHeader,
        insertModalFooter: this.createCustomModalFooter,
        btnGroup: this.createCustomButtonGroup,
        searchField: this.createCustomSearchField,
        clearSearch: true,
        handleConfirmDeleteRow: this.onConfirmDeleteRow.bind(this)
    };

    cellEditProps = {
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: this.beforeSaveHook.bind(this)
    };

    createTimeInputField = (column, attr, editorClass, ignoreEditable, defaultValue) => {
        return (
            <TimeInputField ref={attr.ref} editorClass={ editorClass } defaultValue={defaultValue}/>
        );
    };

    createTimeEditor = (onUpdate, props) => (
        <TimeEditor onUpdate = { onUpdate } { ...props } />
    );

    render() {
        return (
            <>
                <div className="card">
                    <div className="card-header">
                        <h3>TimeSlots</h3>
                    </div>
                </div>
                <div>
                    <BootstrapTable hover
                                    condensed
                                    data={this.state.data}
                                    search
                                    version='4'
                                    insertRow
                                    deleteRow
                                    selectRow={{ mode: 'checkbox' }}
                                    options={this.tableProps}
                                    cellEdit={this.state.editMode ? this.cellEditProps : {}}>
                        <TableHeaderColumn hidden
                                           hiddenOninsert
                                           autoValue
                                           isKey
                                           dataField='id'>id</TableHeaderColumn>
                        <TableHeaderColumn dataField='startTime'
                                           dataFormat={this.dateFormatter}
                                           editable={{ validator: this.startTimeValidator.bind(this) }}
                                           dataSort={ true }
                                           customEditor={{ getElement: this.createTimeEditor}}
                                           customInsertEditor={ { getElement: this.createTimeInputField } }>Start Time</TableHeaderColumn>
                        <TableHeaderColumn dataField='endTime'
                                           dataFormat={this.dateFormatter}
                                           editable={{ validator: this.endTimeValidator.bind(this) }}
                                           dataSort={ true }
                                           customEditor={{ getElement: this.createTimeEditor}}
                                           customInsertEditor={ { getElement: this.createTimeInputField } }>End Time</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </>
        )
    }
}

export default TimeSlots
