import React from "react";
import {
    BootstrapTable,
    ButtonGroup,
    DeleteButton,
    InsertButton,
    InsertModalFooter,
    InsertModalHeader,
    SearchField,
    TableHeaderColumn,
} from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import $ from "jquery";
import Alert from "react-s-alert";
import DropDownEditor from "./DropDownEditor";

class Sessions extends React.Component {
    constructor(props) {
        super(props);
        this.getData();
        this.state = {
            data: [],
            editMode: false,
            deletedRows: [],
            rooms: [],
            speakers: [],
            timeSlots: [],
        };
    }

    getData() {
        $.ajax({
            method: "GET",
            url: "/Session/all",
            type: "json",
            contentType: "application/json",
            success: (response) => {
                this.setState({
                    data: response,
                });
            },
        }).catch(function (xhr, status, error) {
            Alert.error("Unable to load session table data.", {
                position: "top-right",
                effect: "stackslide",
                timeout: 2000,
            });

            this.setState({
                data: [],
            });
        });
        $.ajax({
            method: "GET",
            url: "/Room/all",
            type: "json",
            contentType: "application/json",
            success: (response) => {
                this.setState({
                    rooms: response,
                });
            },
        }).catch(function (xhr, status, error) {
            Alert.error("Unable to load room table data.", {
                position: "top-right",
                effect: "stackslide",
                timeout: 2000,
            });

            this.setState({
                rooms: [],
            });
        });
        $.ajax({
            method: "GET",
            url: "/Speaker/all",
            type: "json",
            contentType: "application/json",
            success: (response) => {
                this.setState({
                    speakers: response,
                });
            },
        }).catch(function (xhr, status, error) {
            Alert.error("Unable to load speaker table data.", {
                position: "top-right",
                effect: "stackslide",
                timeout: 2000,
            });

            this.setState({
                speakers: [],
            });
        });
        $.ajax({
            method: "GET",
            url: "/TimeSlot/all",
            type: "json",
            contentType: "application/json",
            success: (response) => {
                this.setState({
                    timeSlots: response,
                });
            },
        }).catch(function (xhr, status, error) {
            Alert.error("Unable to load time slot table data.", {
                position: "top-right",
                effect: "stackslide",
                timeout: 2000,
            });

            this.setState({
                timeSlots: [],
            });
        });
    }

    addRowHook(row) {
        // Clear our the id field since the backend will auto generate one for us
        row.id = null;
        row.isNew = true;

        row.room = this.state.rooms.find((room) => room["id"] === row.room) || null;
        row.speaker =
            this.state.speakers.find((speaker) => speaker["id"] === row.speaker) ||
            null;
        row.timeSlot =
            this.state.timeSlots.find(
                (timeSlot) => timeSlot["id"] === row.timeSlot
            ) || null;

        this.addRowAjaxCall(row);
    }

    // We use this call here when we do not want to delete the row id
    addRowAjaxCall(row) {
        const data = this.state.data;

        $.ajax({
            method: "POST",
            url: "/Session/saveSession",
            data: JSON.stringify(row),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                data.push(response);
                this.setState({
                    data: data,
                });
                Alert.success("Session added.", {
                    position: "top-right",
                    effect: "stackslide",
                    timeout: 2000,
                });
            },
        }).catch(function (xhr, status, error) {
            Alert.error("Error saving row.", {
                position: "top-right",
                effect: "stackslide",
                timeout: 2000,
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
            url: "/Session/deleteSession",
            data: JSON.stringify(rowIdsToDelete),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                this.setState({
                    data: data.filter((row) => !rowIdsToDelete.includes(row.id)),
                });

                Alert.success("Row(s) deleted.", {
                    position: "top-right",
                    effect: "stackslide",
                    timeout: 2000,
                });
            },
        }).catch(function (xhr, status, error) {
            Alert.error("Error deleting row(s).", {
                position: "top-right",
                effect: "stackslide",
                timeout: 2000,
            });
        });
    }

    beforeSaveHook(row, cellName, cellValue, done) {
        let mockRow = {...row};
        mockRow[cellName] = !!cellValue ? cellValue : null;

        // if nothing changes then void backend call
        if (row[cellName] === mockRow[cellName]) {
            return true;
        }

        $.ajax({
            method: "POST",
            url: "/Session/saveSession",
            data: JSON.stringify(mockRow),
            type: "json",
            contentType: "application/json",
            success: (response) => {
                Alert.success("Row updated.", {
                    position: "top-right",
                    effect: "stackslide",
                    timeout: 2000,
                });
                done(true);
            },
        }).catch(function (xhr, status, error) {
            Alert.error("Error saving row.", {
                position: "top-right",
                effect: "stackslide",
                timeout: 2000,
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
        const response = {
            isValid: true,
            notification: {type: "success", msg: "", title: ""},
        };
        if (!value) {
            response.isValid = false;
            response.notification.type = "error";
            response.notification.msg = "Value must be inserted";
            response.notification.title = "Requested Value";
        }
        return response;
    }

    roomFormatter(value) {
        return !!value ? value["name"] : "";
    }

    speakerFormatter(value) {
        return !!value ? value["speakerName"] : "";
    }

    timeSlotFormatter(value) {
        return !!value ? value["startTime"] + " - " + value["endTime"] : "";
    }

    createCustomInsertButton = () => {
        return (
            <InsertButton
                btnText="Insert Session"
                btnContextual="btn-success"
                className="add-btn"
            />
        );
    };

    createCustomDeleteButton = () => {
        return (
            <DeleteButton
                btnText="Delete Session"
                btnContextual="btn-danger"
                className="delete-btn"
            />
        );
    };

    createCustomModalHeader = () => {
        return <InsertModalHeader className="modal-header" title="Add Session"/>;
    };

    handleModalClose(closeModal) {
        closeModal();
    }

    createCustomModalFooter = (closeModal) => {
        return (
            <InsertModalFooter
                className="modal-footer"
                closeBtnContextual="btn-light"
                saveBtnContextual="btn-success"
                closeBtnClass="modal-close-btn"
                saveBtnClass="modal-save-btn"
                onModalClose={() => this.handleModalClose(closeModal)}
            />
        );
    };

    createCustomButtonGroup = (props) => {
        return (
            <ButtonGroup sizeClass="btn-group-md">
                {props.showSelectedOnlyBtn}
                {props.insertBtn}
                {props.deleteBtn}
                <button
                    type="button"
                    className={`btn btn-info edit-mode-btn`}
                    onClick={() => this.setState({editMode: !this.state.editMode})}
                >
                    {this.state.editMode ? "Exit Edit Mode" : "Edit Mode"}
                </button>
                {this.state.deletedRows.length > 0 ? (
                    <button
                        type="button"
                        className={`btn btn-warning undo-btn`}
                        onClick={this.onUndo.bind(this)}
                    >
                        Undo Delete
                    </button>
                ) : null}
            </ButtonGroup>
        );
    };

    createCustomSearchField = () => {
        return (
            <SearchField
                className="search-field"
                style={{height: 40, fontSize: 15}}
            />
        );
    };

    customRoomField = (column, attr, editorClass, ignoreEditable) => {
        return (
            <select className={`${editorClass}`} {...attr}>
                <option key={null} value={null} selected>
                    Please Choose a Room...
                </option>
                {this.state.rooms.map((room) => (
                    <option key={room["name"]} value={room["id"]}>
                        {room["name"]}
                    </option>
                ))}
            </select>
        );
    };

    customSpeakerField = (column, attr, editorClass, ignoreEditable) => {
        return (
            <select className={`${editorClass}`} {...attr}>
                <option key={null} value={null} selected>
                    Please Choose a Speaker...
                </option>
                {this.state.speakers.map((speaker) => (
                    <option key={speaker["email"]} value={speaker["id"]}>
                        {speaker["speakerName"]}
                    </option>
                ))}
            </select>
        );
    };

    customTimeSlotField = (column, attr, editorClass, ignoreEditable) => {
        return (
            <select className={`${editorClass}`} {...attr}>
                <option key={null} value={null} selected>
                    Please Choose a TimeSlot...
                </option>
                {this.state.timeSlots.map((timeSlot) => (
                    <option
                        key={timeSlot["startTime"] + " - " + timeSlot["endTime"]}
                        value={timeSlot["id"]}
                    >
                        {timeSlot["startTime"] + " - " + timeSlot["endTime"]}
                    </option>
                ))}
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
        handleConfirmDeleteRow: this.onConfirmDeleteRow.bind(this),
    };

    cellEditProps = {
        mode: "click",
        blurToSave: true,
        beforeSaveCell: this.beforeSaveHook.bind(this),
    };

    createDropDownEditor = (onUpdate, props) => (
        <DropDownEditor onUpdate={onUpdate} {...props} />
    );

    render() {
        return (
            <>
                <div className="card">
                    <div className="card-header">
                        <h3>Sessions</h3>
                    </div>
                </div>
                <div>
                    <BootstrapTable
                        hover
                        condensed
                        data={this.state.data}
                        search
                        version="4"
                        insertRow
                        deleteRow
                        selectRow={{mode: "checkbox"}}
                        options={this.tableProps}
                        cellEdit={this.state.editMode ? this.cellEditProps : {}}
                    >
                        <TableHeaderColumn
                            hidden
                            hiddenOninsert
                            autoValue
                            isKey
                            dataField="id"
                        >
                            id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="sessionTitle"
                            editable={{validator: this.cannotBeEmptyValidator}}
                            dataSort={true}
                        >
                            Session Title
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="room"
                            dataFormat={this.roomFormatter}
                            editable={{
                                type: "select",
                                options: {values: this.state.rooms},
                            }}
                            customEditor={{
                                getElement: this.createDropDownEditor,
                                customEditorParameters: {
                                    data: this.state.rooms,
                                    getDisplayName: (room) =>
                                        room["name"]
                                },
                            }}
                            customInsertEditor={{getElement: this.customRoomField}}
                            dataSort={true}
                        >
                            Room
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="speaker"
                            dataFormat={this.speakerFormatter}
                            editable={{
                                type: "select",
                                options: {values: this.state.speakers},
                            }}
                            customEditor={{
                                getElement: this.createDropDownEditor,
                                customEditorParameters: {
                                    data: this.state.speakers,
                                    getDisplayName: (speaker) =>
                                        speaker["speakerName"],
                                },
                            }}
                            customInsertEditor={{getElement: this.customSpeakerField}}
                            dataSort={true}
                        >
                            Speaker
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="timeSlot"
                            dataFormat={this.timeSlotFormatter}
                            customEditor={{
                                getElement: this.createDropDownEditor,
                                customEditorParameters: {
                                    data: this.state.timeSlots,
                                    getDisplayName: (timeSlot) =>
                                        timeSlot["startTime"] + " - " + timeSlot["endTime"],
                                },
                            }}
                            customInsertEditor={{getElement: this.customTimeSlotField}}
                            dataSort={true}
                        >
                            Time Slot
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </>
        );
    }
}

export default Sessions;
