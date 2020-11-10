import React from "react";

class DropDownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.updateSelectedTimeSlot = this.updateSelectedTimeSlot.bind(this);
        this.triggerSave = this.triggerSave.bind(this);
        this.state = {
            selectedValue: props.defaultValue,
            data: props.data || [],
            alreadySaving: false
        };
    }

    updateSelectedTimeSlot(event) {
        this.setState({
            selectedValue: this.state.data.find(
                (row) => row["id"] === event.target.value
            ),
        });
    }

    triggerSave() {
        if (this.state.alreadySaving) {
            return;
        }

        this.setState({alreadySaving: true});
        this.props.onUpdate(this.state.selectedValue);
    }

    focus() {
    }

    componentDidMount() {
        this.nameInput.focus();
    }

    render() {
        return (
            <select
                className={"form-control editor edit-text"}
                value={this.state.selectedValue ? this.state.selectedValue["id"] : ""}
                onChange={this.updateSelectedTimeSlot}
                onBlur={this.triggerSave}
                onKeyDown={this.triggerSave}
                ref={(input) => {
                    this.nameInput = input;
                }}
            >
                <option key={null} value={""}>
                    Please Choose a value...
                </option>
                {this.state.data.map((row) => (
                    <option key={row["id"]} value={row["id"]}>
                        {this.props.getDisplayName(row)}
                    </option>
                ))}
            </select>
        );
    }
}

export default DropDownEditor