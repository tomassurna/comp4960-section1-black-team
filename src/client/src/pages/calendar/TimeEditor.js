import React from "react";

class TimeEditor extends React.Component {
    alreadySaving = false;

    constructor(props) {
        super(props);
        this.updateSelected = this.updateSelected.bind(this);
        this.updateSelectedTimePeriod = this.updateSelectedTimePeriod.bind(this);
        this.triggerSave = this.triggerSave.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {
            selectedTime: props.defaultValue || "",
            data: props.data || [],
            timePeriod:
                parseInt((props.defaultValue || "").split(":")[0]) < 10 ? "AM" : "PM",
        };
    }

    updateSelected(event) {
        this.setState({selectedTime: event.target.value});
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

    getOptions(timePeriod) {
        const start = timePeriod === "AM" ? 6 : 12;
        const end = timePeriod === "AM" ? 12 : 22;

        const options = [];

        for (let i = start; i < end; i++) {
            const time = i < 10 ? "0" + i + ":00:00" : i + ":00:00";

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
                    value={this.state.selectedTime || ""}
                    onChange={this.updateSelected}
                    onKeyDown={this.triggerSave}
                >
                    {this.getOptions(this.state.timePeriod)}
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
