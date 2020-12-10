import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { IStreamDetailsSectionProps, IStreamDetailsSectionState } from "./StreamDetailsSection.props";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Requests } from "../../Util/Requests";

class StreamDetailsSection extends Component<IStreamDetailsSectionProps, IStreamDetailsSectionState> {
    constructor(props: IStreamDetailsSectionProps) {
        super(props);

        this.state = {
            failure: false,
            showNotifyStreamersSpinner: false
        };
    }

    render() {
        const accountInfo = this.props.user.dacast_account_info;
        const streamUrl = accountInfo ? accountInfo.StreamUrl : "stream_url";
        const streamKey = accountInfo ? accountInfo.StreamKey : "stream_key";
        const username = accountInfo ? accountInfo.Username : "username";
        const password = accountInfo ? accountInfo.Password : "password";

        const { failure, showNotifyStreamersSpinner } = this.state;

        return (
            <div style={{ width: "350px", margin: "0 auto" }}>
                <Form style={{ padding: "8px" }}>
                    <Form.Group controlId="formServer">
                        <Form.Label>Server</Form.Label>
                        <Form.Control
                            readOnly
                            style={{ width: "300px" }}
                            type="text"
                            defaultValue={streamUrl} />
                    </Form.Group>

                    <Form.Group controlId="formStreamKey">
                        <Form.Label>Stream Key</Form.Label>
                        <Form.Control
                            readOnly
                            style={{ width: "300px" }}
                            type="text"
                            defaultValue={streamKey} />
                    </Form.Group>

                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            readOnly
                            style={{ width: "300px" }}
                            type="text"
                            defaultValue={username} />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            readOnly
                            style={{ width: "300px" }}
                            type="text"
                            defaultValue={password} />
                    </Form.Group>
                    <Button onClick={this.handleNotifyStreamers}
                        variant="success" type="submit">
                        Notify Followers
                            {showNotifyStreamersSpinner &&
                            <Spinner
                                style={{ verticalAlign: "middle", margin: "8px" }}
                                animation="border"
                                variant="light" />}
                    </Button>
                    {failure && this.renderFailureMessage()}
                </Form>
            </div>
        );
    }

    private renderFailureMessage = () => {
        return (
            <div style={{ color: "red" }}>
                Sorry, that didnt work. Please try again. <br />
                If this keeps happening please reach out to us and we'll try to fix it as soon as possible.
            </div>
        );
    }

    private handleNotifyStreamers = (event: any) => {
        event.preventDefault();

        this.setState({ showNotifyStreamersSpinner: true });

        const channelId = this.props.user.dacast_account_info.ChannelId;
        const streamerName = this.props.user.dacast_account_info.Name;
        const data = { token: this.props.refreshToken, channelId, streamerName };
        Requests.postData("/api/v1/channel/notify", data, /*useAuth*/ true).then(res => {
            this.setState({
                failure: !res.success,
                showNotifyStreamersSpinner: false
            });
        });
    }
}

export default StreamDetailsSection;
