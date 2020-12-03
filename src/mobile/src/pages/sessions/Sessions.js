import React from "react";
import $ from "jquery";
import SessionViewComponent from "./SessionViewComponent";
import { chain, orderBy, uniq } from "lodash";

class Sessions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedTimeSlot: "",
      username: props.username,
    };

    this.getData.bind(this);
    this.getData();
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
      this.setState({
        data: [],
      });
    });
  }

  timeFormatter(value) {
    let isAm = true;
    if (!value) {
      return value;
    }

    let result = "";
    for (let i = 0; i < 5; i++) {
      result += value[i];
    }

    if (result.charAt(0) >= 1 && result.charAt(1) >= 3) {
      isAm = false;
    }

    if (isAm) {
      result += " AM";
      if (result.charAt(0) === "0") {
        result = result.substring(1);
      }
    } else {
      result += " PM";
      result = result.substring(1);
      result = result.charAt(0) - 2 + result.substring(1);
    }

    return result;
  }

  timeSlotFormatter(timeSlot) {
    if (!timeSlot) {
      return;
    }

    return (
      this.timeFormatter(timeSlot.startTime) +
      " - " +
      this.timeFormatter(timeSlot.endTime)
    );
  }

  render() {
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h3>Sessions</h3>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <select
              className={"form-control"}
              placeholder={"Select Time Slot"}
              defaultValue={null}
              onChange={(event) => {
                this.setState({ selectedTimeSlot: event.target.value });
              }}
            >
              <option key={""} value={""}>
                Select Time Slot...
              </option>
              {uniq(
                orderBy(
                  chain(this.state.data)
                    .map((session) => session.timeSlot)
                    .value(),
                  "startTime"
                )
                  .filter((timeSlot) => !!timeSlot)
                  .map((timeSlot) => this.timeSlotFormatter(timeSlot))
              ).map((timeSlot) => {
                return (
                  <option key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            {this.state.data
              .filter((session) => !!session.timeSlot)
              .filter((session) =>
                !!this.state.selectedTimeSlot
                  ? !!session.timeSlot &&
                    this.timeSlotFormatter(session.timeSlot) ===
                      this.state.selectedTimeSlot
                  : true
              )
              .map((session) => {
                return (
                  <SessionViewComponent
                    key={session.id}
                    session={session}
                    username={this.state.username}
                  />
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default Sessions;
