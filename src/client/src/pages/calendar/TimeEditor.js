import React from "react";

class TimeEditor extends React.Component {
    alreadySaving = false;

    constructor(props) {
        super(props);
        this.updateHourSelected = this.updateHourSelected.bind(this);
        this.updateMinuteSelected = this.updateMinuteSelected.bind(this);
        this.updateSelectedTimePeriod = this.updateSelectedTimePeriod.bind(this);
        this.triggerSave = this.triggerSave.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {
            selectedTime: props.defaultValue || "",
            selectedHour: (props.defaultValue || "").split(":")[0],
            selectedMinute: (props.defaultValue || "").split(":")[1],
            timePeriod:
                parseInt((props.defaultValue || "").split(":")[0]) < 10 ? "AM" : "PM",
        };
    }

    updateHourSelected(event) {
        this.setState({
            selectedTime: event.target.value + ":" + this.state.selectedMinute + ":00",
            selectedHour: event.target.value
        });
    }

    updateMinuteSelected(event) {
        this.setState({
            selectedTime: this.state.selectedHour + ":" + event.target.value + ":00",
            selectedMinute: event.target.value
        });
    }

    updateSelectedTimePeriod(event) {
        this.setState({
            timePeriod: event.target.value,
            selectedTime: event.target.value === "AM" ? "06:00:00" : "12:00:00",
        });
    }

    triggerSave() {
        if (this.alreadySaving) {
            return;
        }

        this.alreadySaving = true;
        this.props.onUpdate(this.state.selectedTime);
        this.alreadySaving = false;
    }

    focus() {
        this.nameInput.focus();
    }

    componentDidMount() {
        this.nameInput.focus();
    }

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

    // From https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
    handleBlur(event) {
        const currentTarget = event.currentTarget;

        // Check the newly focused element in the next tick of the event loop
        setTimeout(() => {
            // Check if the new activeElement is a child of the original container
            if (!currentTarget.contains(document.activeElement)) {
                // You can invoke a callback or add custom logic here
                this.triggerSave();
            }
        }, 0);
    }

    render() {
        return (
            <div
                tabIndex="1"
                style={{display: "flex"}}
                ref={(input) => {
                    this.nameInput = input;
                }}
                onBlur={this.handleBlur}
                onKeyDown={this.triggerSave}
            >
                <select
                    className={"form-control editor edit-select"}
                    value={this.state.selectedHour || ""}
                    onChange={this.updateHourSelected}
                    onKeyDown={this.triggerSave}
                >
                    {this.getHourOptions(this.state.timePeriod)}
                </select>
                <select
                    className={"form-control editor edit-select"}
                    value={this.state.selectedMinute || ""}
                    onChange={this.updateMinuteSelected}
                    onKeyDown={this.triggerSave}
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
                    onKeyDown={this.triggerSave}
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

export default TimeEditor;
