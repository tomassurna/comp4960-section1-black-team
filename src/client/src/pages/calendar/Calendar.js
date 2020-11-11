import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import $ from "jquery";
import Alert from "react-s-alert";
import randomColor from "randomcolor";
import TimeEditor from "./TimeEditor";

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
            lunchTime: "12:00:00",
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

    lunchTimeUpdate(value) {
        if (this.state.lunchTime !== value) {
            this.setState({lunchTime: value});
        }
    }

    render() {
        return (
            <>
                <div className="card">
                    <div className="card-header">
                        <h3 style={{display: "inline"}}>Calendar</h3>
                        <label className={"lunch-time-input-area"}>
                            Lunch Time:
                            <TimeEditor
                                defaultValue={this.state.lunchTime}
                                onUpdate={this.lunchTimeUpdate.bind(this)}
                            />
                        </label>
                    </div>
                </div>

                <FullCalendar
                    allDaySlot={false}
                    dayMinWidth={200}
                    events={this.state.sessions
                        .filter((session) => session["room"])
                        .filter((session) => session["timeSlot"])
                        .map((session) => {
                            return {
                                borderColor: "transparent",
                                color: randomColor({luminosity: "light", hue: "blue"}),
                                description:
                                    session["sessionTitle"] +
                                    "\n" +
                                    session["speaker"]["speakerName"],
                                end: "2020-09-07T" + session["timeSlot"]["endTime"],
                                id: session["id"],
                                resourceId: session["room"]["id"],
                                start: "2020-09-07T" + session["timeSlot"]["startTime"],
                                textColor: "black",
                                title:
                                    session["sessionTitle"] +
                                    "\n" +
                                    session["speaker"]["speakerName"],
                            };
                        })
                        .concat([
                            {
                                borderColor: "transparent",
                                color: randomColor({luminosity: "light", hue: "blue"}),
                                end: "2020-09-07T" + this.state.lunchTime,
                                resourceIds: this.state.rooms.map((room) => room["id"]),
                                start: "2020-09-07T" + this.state.lunchTime,
                                textColor: "black",
                                title: "Lunch",
                            },
                        ])}
                    views={{
                        resourceTimeGridOneDay: {
                            buttonText: "2 days",
                            duration: {days: 1},
                            type: "resourceTimeGrid",
                        },
                    }}
                    headerToolbar={{left: "", center: "", right: ""}}
                    height={"auto"}
                    initialDate={"2020-09-07"}
                    initialView={"resourceTimeGridOneDay"}
                    plugins={[resourceTimeGridPlugin, scrollGridPlugin]}
                    resourceOrder={"title"}
                    resources={this.state.rooms.map((room) => {
                        return {id: room["id"], title: room["name"]};
                    })}
                    schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
                    slotDuration={"00:15:00"}
                    slotMaxTime={"21:15:00"}
                    slotMinTime={"06:00:00"}
                    validRange={{start: "2020-09-07", end: "2020-09-07"}}
                />
            </>
        );
    }
}

export default CalendarPage;
