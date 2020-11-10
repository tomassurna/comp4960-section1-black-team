import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import $ from "jquery";
import Alert from "react-s-alert";
import randomColor from "randomcolor";

class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.getData();
        this.state = {
            sessions: [],
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
                    sessions: response,
                });
            },
        }).catch(function (xhr, status, error) {
            Alert.error("Unable to load session table data.", {
                position: "top-right",
                effect: "stackslide",
                timeout: 2000,
            });

            this.setState({
                sessions: [],
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

    render() {
        return (
            <>
                <div className="card">
                    <div className="card-header">
                        <h3>Calendar</h3>
                    </div>
                </div>

                <FullCalendar
                    plugins={[resourceTimeGridPlugin]}
                    initialView={"resourceTimeGridOneDay"}
                    schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
                    allDaySlot={false}
                    initialDate={"2020-09-07"}
                    resources={this.state.rooms.map((room) => {
                        return {id: room["id"], title: room["name"]};
                    })}
                    height={"auto"}
                    slotMinTime={'06:00:00'}
                    slotMaxTime={'21:15:00'}
                    slotDuration={'00:15:00'}
                    validRange={{
                        start: '2020-09-07',
                        end: '2020-09-07'
                    }}
                    headerToolbar={{
                        left: '',
                        center: '',
                        right: ''
                    }}
                    events={this.state.sessions
                        .filter((session) => session["room"])
                        .filter((session) => session["timeSlot"])
                        .map((session) => {
                            return {
                                id: session["id"],
                                resourceId: session["room"]["id"],
                                title: session["sessionTitle"],
                                start: "2020-09-07T" + session["timeSlot"]["startTime"],
                                end: "2020-09-07T" + session["timeSlot"]["endTime"],
                                color: randomColor({luminosity: 'light', hue:"blue"}),
                                textColor: "black",
                                borderColor: "transparent"
                            };
                        })}

                    views={{
                        resourceTimeGridOneDay: {
                            type: 'resourceTimeGrid',
                            duration: {days: 1},
                            buttonText: '2 days',
                        }
                    }}
                />
            </>
        );
    }
}

export default CalendarPage;
