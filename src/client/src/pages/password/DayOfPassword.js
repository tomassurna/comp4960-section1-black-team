import React from 'react'
import {CButton, CCol, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {freeSet} from "@coreui/icons"
import Alert from 'react-s-alert';
import $ from 'jquery';

class DayOfPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: ""
        }
    }

    async updateDayOfPassword() {
        $.ajax({
            method: "POST",
            url: "/DayOfPassword/savePassword",
            data: this.state.password,
            type: "json",
            contentType: "application/json",
            success: () => {
                this.setState({password: ""});
                Alert.success("Password Update", {
                    position: 'top-right',
                    effect: 'stackslide',
                    timeout: 2000
                })
            }
        });
    }

    render() {
        return (
            <>
                <Alert stack={{limit: 3}}/>
                <div className="card">
                    <div className="card-header">
                        <h3>Day Of Password</h3>
                    </div>
                </div>

                <div className="card">
                    <div className={"card-body"}>
                        <CInputGroup className="mb-4" style={{width: "50%"}}>
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    <CIcon content={freeSet.cilLockLocked}/>
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                                type="password" placeholder="Password"
                                value={this.state.password}
                                onChange={(event) => this.setState({password: event.target.value})}
                                autoComplete="current-password"/>
                        </CInputGroup>
                        <CRow>
                            <CCol xs="6">
                                <CButton color="info" className="px-4"
                                         onClick={this.updateDayOfPassword.bind(this)}>Update Day Of Password</CButton>
                            </CCol>
                        </CRow>

                    </div>
                </div>
            </>
        );
    }
};
export default DayOfPassword;