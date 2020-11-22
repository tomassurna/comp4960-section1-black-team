import React from "react";

class TimeInputField extends React.Component {
    constructor(props) {
        super(props);
        this.updateHourSelected = this.updateHourSelected.bind(this);
        this.updateMinuteSelected = this.updateMinuteSelected.bind(this);
        this.updateSelectedTimePeriod = this.updateSelectedTimePeriod.bind(this);
        this.state = {
            selectedTime: props.defaultValue || "12:00:00",
            selectedHour: (props.defaultValue || "12").split(":")[0],
            selectedMinute: (props.defaultValue || "00").split(":")[1],
            timePeriod:
                parseInt((props.defaultValue || "").split(":")[0]) < 10 ? "AM" : "PM",
        };
    }

    updateHourSelected(event) {
        this.setState({
            selectedTime:
                event.target.value + ":" + this.state.selectedMinute + ":00",
            selectedHour: event.target.value,
        });
    }

    updateMinuteSelected(event) {
        this.setState({
            selectedTime: this.state.selectedHour + ":" + event.target.value + ":00",
            selectedMinute: event.target.value,
        });
    }

    updateSelectedTimePeriod(event) {
        this.setState({
            timePeriod: event.target.value,
            selectedTime:
                event.target.value === "AM"
                    ? "06:" + this.state.selectedMinute + ":00"
                    : "12:" + this.state.selectedMinute + ":00",
        });
    }

    // Unused by component but library requires
    getFieldValue = () => {
        return this.state.selectedTime;
    };

    getHourOptions(timePeriod) {
        const start = timePeriod === "AM" ? 6 : 12;
        const end = timePeriod === "AM" ? 12 : 22;

        const options = [];

        for (let i = start; i < end; i++) {
            const time = i < 10 ? "0" + i : i;

            options.push(
                <option key={time} value={time}>
                    {i >= 13 ? (i % 13) + 1 : i}
                </option>
            );
        }

        return options;
    }

    render() {
        return (
            <div style={{display: "flex"}}>
                <select
                    className={"form-control editor edit-select"}
                    value={this.state.selectedHour || ""}
                    onChange={this.updateHourSelected}
                >
                    {this.getHourOptions(this.state.timePeriod)}
                </select>
                <select
                    className={"form-control editor edit-select"}
                    value={this.state.selectedMinute || ""}
                    onChange={this.updateMinuteSelected}
                >
                    <option key={"00"} value={"00"}>
                        00
                    </option>
                    <option key={"15"} value={"15"}>
                        15
                    </option>
                    <option key={"30"} value={"30"}>
                        30
                    </option>
                    <option key={"45"} value={"45"}>
                        45
                    </option>
                </select>

                <select
                    className={"form-control editor edit-select"}
                    value={this.state.timePeriod || ""}
                    onChange={this.updateSelectedTimePeriod}
                >
                    <option key={"AM"} value={"AM"}>
                        AM
                    </option>
                    <option key={"PM"} value={"PM"}>
                        PM
                    </option>
                </select>
            </div>
        );
    }
}

export default TimeInputField;
