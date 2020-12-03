import React from "react";
import Modal from "react-modal";
import $ from "jquery";

class AddCountModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: {
        ...{
          beginningCount: 0,
          middleCount: 0,
          endCount: 0,
          counterName: this.props.username,
        },
        ...props.session.count,
      },
    };
  }

  addUpdateCount() {
    $.ajax({
      method: "POST",
      url: "/Count/saveCount",
      data: JSON.stringify(this.state.count),
      type: "json",
      contentType: "application/json",
      success: (response) => {
        this.setState({
          count: response,
        });

        $.ajax({
          method: "POST",
          url: "/Session/saveSession",
          data: JSON.stringify({
            ...this.props.session,
            ...{ count: this.state.count },
          }),
          type: "json",
          contentType: "application/json",
          success: (response) => {
            this.props.saveSessionCallback(response);
          },
        }).catch(function (xhr, status, error) {
          // Todo Error Handling
        });

        this.props.closeModal();
      },
    }).catch(function (xhr, status, error) {
      // Todo Error Handling
    });
  }

  render() {
    Modal.setAppElement("body");
    return (
      <Modal {...this.props}>
        <div className={"modal-header"}>
          <h4 style={{ margin: 0 }}>Add/Edit Count Modal</h4>
          <button
            type="button"
            className="close"
            onClick={this.props.closeModal}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className={"modal-header"}>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                width: "90%",
              }}
            >
              <h5 style={{ marginBottom: 0 }}>
                {this.props.session.sessionTitle}
              </h5>
              <h5
                style={{
                  marginRight: ".5vh",
                  marginLeft: ".5vh",
                  marginBottom: 0,
                }}
              >
                -
              </h5>
              <h5 style={{ marginBottom: 0 }}>
                {!!this.props.session.room
                    ? this.props.session.room.name
                    : ""}
              </h5>
            </div>
            <h5 style={{ marginTop: ".5rem", fontWeight: "bold" }}>
              Counter: {this.state.count.counterName}
            </h5>
          </div>
        </div>
        <div className={"modal-body"}>
          <div className={"form-group"}>
            <label>Beginning Count</label>
            <input
              type={"number"}
              placeholder={"Beginning Count"}
              value={this.state.count.beginningCount}
              min="0"
              className={"form-control"}
              onChange={(event) => {
                this.setState({
                  count: {
                    ...this.state.count,
                    ...{ beginningCount: parseInt(event.target.value) },
                  },
                });
              }}
            />
          </div>
          <div className={"form-group"}>
            <label>Middle Count</label>
            <input
              type={"number"}
              placeholder={"Middle Count"}
              value={this.state.count.middleCount}
              min={0}
              className={"form-control"}
              onChange={(event) => {
                this.setState({
                  count: {
                    ...this.state.count,
                    ...{ middleCount: parseInt(event.target.value) },
                  },
                });
              }}
            />
          </div>
          <div className={"form-group"}>
            <label>End Count</label>
            <input
              type={"number"}
              placeholder={"End Count"}
              value={this.state.count.endCount}
              min={0}
              className={"form-control"}
              onChange={(event) => {
                this.setState({
                  count: {
                    ...this.state.count,
                    ...{ endCount: parseInt(event.target.value) },
                  },
                });
              }}
            />
          </div>
        </div>

        <div className="modal-footer modal-footer">
          <button
            type="button"
            className="btn btn-light modal-close-btn"
            onClick={this.props.closeModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success modal-save-btn"
            onClick={this.addUpdateCount.bind(this)}
          >
            Save
          </button>
        </div>
      </Modal>
    );
  }
}

export default AddCountModal;
