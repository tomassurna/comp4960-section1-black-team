import React from 'react'
import {BootstrapTable, TableHeaderColumn, InsertButton, ExportCSVButton, DeleteButton, InsertModalHeader} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import $ from 'jquery';

class Speakers extends React.Component {
    constructor(props) {
        super(props);
        this.getData();
        this.state = {
            data: this.data
        }
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
            // TODO: Some form of error handling.
            console.log(error);
            this.setState({
                data: []
            });
        });
    }


    addRowHook(row) {
        const data = this.state.data || [];

        // Clear our the id field since the backend will auto generate one for us
        row.id = null;
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
            // TODO: Some form of error handling.
            console.log(error);
        });
    }

    deleteRowHook(rowIdsToDelete) {
        $.ajax({
            method: "POST",
            url: "/Speaker/deleteSpeaker",
            data: JSON.stringify(rowIdsToDelete),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                // TODO: Implement some undo function
            }
        }).catch(function (xhr, status, error) {
            // TODO: Some form of error handling.
            console.log(error);
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
            // TODO: Some form of error handling.
            console.log(error);
            done(false);
        });

        return 1;
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
        if (!(String(value).match(re)) && value != false) {
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
        if (!(String(value).match(re)) && value != false) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Number entered was not valid';
            response.notification.title = 'Invalid Entry';
        }
        return response;
    }

    // create custom buttons and modal 
    createCustomInsertButton = () => {
      return (
        <InsertButton
          btnText='Insert Speaker'
          btnContextual='btn-success'
          className='add-speaker-btn'
          />
      );
    }

    createCustomExportCSVButton = () =>{
      return (
        <ExportCSVButton
          btnText='Export to CSV'
          btnContextual='btn-info'
          className='export-speaker-btn'/>
      );
    }

    createCustomDeleteButton = () =>{
      return (
        <DeleteButton
          btnText='Delete Speaker'
          btnContextual='btn-danger'
          className='delete-speaker-btn'/>
      );
    }

    createCustomModalHeader = () => {
      return (
        <InsertModalHeader
          className='speaker-modal-header'
          title='Add Speaker'/>
      );
    } 

    tableProps = {
        onAddRow: this.addRowHook.bind(this),
        afterDeleteRow: this.deleteRowHook.bind(this),
        insertBtn: this.createCustomInsertButton,
        exportCSVBtn: this.createCustomExportCSVButton,
        deleteBtn:this.createCustomDeleteButton,
        insertModalHeader: this.createCustomModalHeader
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
                    <BootstrapTable striped hover condensed
                                    data={this.state.data}
                        // pagination
                                    exportCSV
                                    version='4'
                                    insertRow
                                    deleteRow
                                    selectRow={{mode: 'checkbox'}}
                                    options={this.tableProps}
                                    cellEdit={this.cellEditProps}>
                        <TableHeaderColumn hidden hiddenOninsert autoValue isKey dataField='id'>id</TableHeaderColumn>
                        <TableHeaderColumn dataField='speakerName' editable={{validator: this.cannotBeEmptyValidator}}>Speaker
                            Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' editable={{validator: this.emailValidator}}>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='everydayNumber' editable={{validator: this.phoneNumberValidator}}>Everyday Number</TableHeaderColumn>
                        <TableHeaderColumn dataField='dayOfNumber'editable={{validator: this.phoneNumberValidator}}>Day Of Number</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </>
        )
    }
}

export default Speakers
