import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      username: "",
      invalid: false,
    };
  }

  onLogin(response) {
    this.setState({
      invalid: !response,
    });
    if (response) {
      this.props.history.push("/pages/sessions");
    }
  }

  render() {
    return (
      <div>
        <div className={"title"}>
          <h1>Boston Code Camp</h1>
        </div>

        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="8">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon content={freeSet.cilUser} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            value={this.state.username}
                            onChange={(event) =>
                              this.setState({ username: event.target.value })
                            }
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon content={freeSet.cilLockLocked} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(event) =>
                              this.setState({ password: event.target.value })
                            }
                            autoComplete="current-password"
                          />
                        </CInputGroup>
                        {this.state.invalid ? (
                          <div className={"invalid"}>
                            Invalid Username/Password
                          </div>
                        ) : (
                          <></>
                        )}
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              color="info"
                              className="px-4"
                              onClick={() =>
                                this.props.authenticate(
                                  this.onLogin.bind(this),
                                  this.state.password
                                )
                              }
                            >
                              Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>
    );
  }
}

export default Login;
