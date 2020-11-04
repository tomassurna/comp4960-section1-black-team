import React from 'react'
import {
    BootstrapTable,
    ButtonGroup,
    DeleteButton,
    ExportCSVButton,
    InsertButton,
    InsertModalHeader,
    TableHeaderColumn
} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import $ from 'jquery';
import Alert from 'react-s-alert';

class Speakers extends React.Component {
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
        return $.ajax({
            method: "GET",
            url: "/Speaker/all",
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
            url: "/Speaker/addSpeaker",
            data: JSON.stringify(row),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                data.push(response);
                this.setState({
                    data: data
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

        this.setState({deletedRows: currentDeletedRows});

        $.ajax({
            method: "POST",
            url: "/Speaker/deleteSpeaker",
            data: JSON.stringify(rowIdsToDelete),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                this.setState({data: data.filter((row) => !rowIdsToDelete.includes(row.id))});

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
        let mockRow = {...row};
        mockRow[cellName] = cellValue;
        $.ajax({
            method: "POST",
            url: "/Speaker/updateSpeaker",
            data: JSON.stringify(mockRow),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                // TODO: Implement some undo function
                done(true);
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
        const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
        if (!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Speaker name must be inserted';
            response.notification.title = 'Requested Value';
        }
        return response;
    }

    emailValidator(value, row) {
        const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!(String(value).match(re)) && !!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Email entered was not valid';
            response.notification.title = 'Invalid Entry';
        }
        return response;
    }

    phoneNumberValidator(value, row) {
        const response = {isValid: true, notification: {type: 'success', msg: '', title: ''}};
        const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!(String(value).match(re)) && !!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Number entered was not valid';
            response.notification.title = 'Invalid Entry';
        }
        return response;
    }

    phoneNumberFormatter(value) {
        // Returns empty if there is no number
        if (!value) {
            return value;
        }
        // Removes all non-number characters from the number string
        let formattedValue = "";
        for (let i = 0; i < value.length; i++) {
            if(value[i] >= '0' && value[i] <= '9') {
                formattedValue += value[i];
            }
        }
        // Creates a new formatted version of edited phone number
        return ('(' + formattedValue.slice(0, 3) + ') ' + formattedValue.slice(3, 6) + '-' + formattedValue.slice(6, 10));
    } 

    createCustomInsertButton = () => {
      return (
        <InsertButton
          btnText='Insert Speaker'
          btnContextual='btn-success'
          className='add-speaker-btn'
          />
      );
    };

    createCustomExportCSVButton = () =>{
      return (
        <ExportCSVButton
          btnText='Export to CSV'
          btnContextual='btn-info'
          className='export-speaker-btn'/>
      );
    };

    createCustomDeleteButton = () =>{
      return (
        <DeleteButton
          btnText='Delete Speaker'
          btnContextual='btn-danger'
          className='delete-speaker-btn'/>
      );
    };

    createCustomModalHeader = () => {
      return (
        <InsertModalHeader
          className='speaker-modal-header'
          title='Add Speaker'/>
      );
    };

    createCustomButtonGroup = props => {
        return (
            <ButtonGroup sizeClass='btn-group-md'>
                {props.showSelectedOnlyBtn}
                {props.exportCSVBtn}
                {props.insertBtn}
                {props.deleteBtn}
                <button type='button'
                        className={`btn btn-primary edit-mode-btn`}
                        onClick={() => this.setState({editMode: !this.state.editMode})}>
                    {this.state.editMode ? "Exit Edit Mode" : "Edit Mode"}
                </button>
                {this.state.deletedRows.length > 0 ?
                    <button type='button'
                            className={`btn btn-primary undo-btn`}
                            onClick={this.onUndo.bind(this)}>
                        Undo Delete
                    </button> : null}
            </ButtonGroup>
        );
    };

    tableProps = {
        onAddRow: this.addRowHook.bind(this),
        onDeleteRow: this.deleteRowHook.bind(this),
        insertBtn: this.createCustomInsertButton,
        exportCSVBtn: this.createCustomExportCSVButton,
        deleteBtn: this.createCustomDeleteButton,
        insertModalHeader: this.createCustomModalHeader,
        btnGroup: this.createCustomButtonGroup,
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
                        <h3>Speakers</h3>
                    </div>
                </div>
                <div>
                    <BootstrapTable striped
                                    hover
                                    condensed
                                    data={this.state.data}
                                    search
                                    version='4'
                                    insertRow
                                    deleteRow
                                    selectRow={{mode: 'checkbox'}}
                                    options={this.tableProps}
                                    cellEdit={this.state.editMode ? this.cellEditProps : {}}>
                        <TableHeaderColumn hidden
                                           hiddenOninsert
                                           autoValue
                                           isKey
                                           dataField='id'>id</TableHeaderColumn>
                        <TableHeaderColumn dataField='speakerName'
                                           editable={{validator: this.cannotBeEmptyValidator}}>Speaker Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'
                                           editable={{validator: this.emailValidator}}>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='everydayNumber'
                                           dataFormat={ this.phoneNumberFormatter }
                                           editable={{validator: this.phoneNumberValidator}}>Everyday Number</TableHeaderColumn>
                        <TableHeaderColumn dataField='dayOfNumber'
                                           dataFormat={ this.phoneNumberFormatter }
                                           editable={{validator: this.phoneNumberValidator}}>Day Of Number</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </>
        )
    }
}

export default Speakers
