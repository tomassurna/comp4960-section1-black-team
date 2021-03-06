import React from 'react'
import {
    BootstrapTable,
    ButtonGroup,
    DeleteButton,
    InsertButton,
    InsertModalHeader,
    InsertModalFooter,
    SearchField,
    TableHeaderColumn
} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import $ from 'jquery';
import Alert from 'react-s-alert';
import { uniqueNamesGenerator, names, colors, animals } from 'unique-names-generator';

class Rooms extends React.Component {
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
            url: "/Room/all",
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
            url: "/Room/saveRoom",
            data: JSON.stringify(row),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                data.push(response);
                this.setState({
                    data: data
                });
                Alert.success("Room added.", {
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
            url: "/Room/deleteRoom",
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
            url: "/Room/saveRoom",
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

    roomNameValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        // check for empty input
        if (!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must be inserted';
            response.notification.title = 'Requested Value';
        }
        // check for duplicate entry (case insensitive)
        else if (!!value && this.state.data.filter(
            (tableRow) => (tableRow["name"].toUpperCase() === value.toUpperCase()) && tableRow["id"] !== row["id"]).length >= 1) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Room entered exists';
            response.notification.title = 'Invalid Entry'
        }
        return response;
    }

    capacityValidator(value, row) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        const MAX_CAPACITY = 200;
        const MIN_CAPACITY = 1;
        // check for valid capacity 
        if (value < MIN_CAPACITY) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Invalid room capacity';
            response.notification.title = 'Requested Value';
        } else if(value > MAX_CAPACITY){
            window.confirm("Are you sure about this capacity?");
        }
        return response;
    }

    createCustomInsertButton = () => {
        return (
            <InsertButton
                btnText='Insert Room'
                btnContextual='btn-success'
                className='add-btn' />
        );
    };

    createCustomDeleteButton = () => {
        return (
            <DeleteButton
                btnText='Delete Room'
                btnContextual='btn-danger'
                className='delete-btn' />
        );
    };

    createCustomModalHeader = () => {
        return (
            <InsertModalHeader
                className='modal-header'
                title='Add Room' />
        );
    };

    handleModalClose(closeModal) {
        closeModal();
    };

    customCapacityField = (column, attr, editorClass, ignoreEditable) => {
        return (
          <input type="number" min="1" max="200" defaultValue="50" className={ `${editorClass}` } { ...attr }/>
        );
      }

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
        for(let i = 0; i < 10; i++){
            this.addRowHook({
                name: uniqueNamesGenerator({ dictionaries: [names, colors, animals], length: 1 }),
                capacity: Math.floor(Math.random() * Math.floor(100))
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

    render() {
        return (
            <>
                <div className="card">
                    <div className="card-header">
                        <h3>Rooms</h3>
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
                        <TableHeaderColumn dataField='name'
                                           editable={{ validator: this.roomNameValidator.bind(this)}}
                                           dataSort={ true }>Room Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='capacity'
                                           editable={{ validator: this.capacityValidator.bind(this) }}
                                           customInsertEditor={ { getElement: this.customCapacityField } }
                                           dataSort={ true }>Capacity</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </>
        )
    }
}

export default Rooms
