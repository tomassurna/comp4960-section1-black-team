import React from "react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import AddCountModal from "./AddCountModal";

class SessionViewComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: props.session,
      showModal: false,
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  saveSessionCallback(session) {
    this.setState({ session });
  }

  render() {
    return (
      <>
        <div
          className="card"
          style={{ marginBottom: "0.5rem", cursor: "pointer" }}
          onClick={this.toggleModal.bind(this)}
        >
          <div className="card-body" style={{ padding: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "90%",
                }}
              >
                <h5 style={{ fontWeight: 600, marginBottom: 0 }}>
                  {this.state.session.sessionTitle}
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
                  {!!this.state.session.room
                    ? this.state.session.room.name
                    : ""}
                </h5>
              </div>
              <div
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CIcon content={freeSet.cilFullscreen} />
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.state.showModal ? (
            <AddCountModal
              isOpen={this.state.showModal}
              session={this.state.session}
              closeModal={this.toggleModal.bind(this)}
              saveSessionCallback={this.saveSessionCallback.bind(this)}
              username={this.props.username}
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default SessionViewComponent;
