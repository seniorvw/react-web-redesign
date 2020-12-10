import React, { Component } from "react";
import Form from "react-bootstrap/Form";

import { IChatMessageInputFormProps } from "./ChatMessageInputForm.props";
import Button from "react-bootstrap/Button";

class ChatMessageInputForm extends Component<IChatMessageInputFormProps> {
  constructor(props: IChatMessageInputFormProps) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: "inherit" }}>
        <Form
          style={{ display: "inline-flex", width: "100%" }}
          onKeyPress={this.handleKeyPress}
          onSubmit={this.props.handleSubmit}>
          <Form.Group style={{ width: "inherit", marginRight: "12px" }} controlId="formMessage">
            <Form.Control style={{ resize: "none" }} as="textarea" rows={2} placeholder="Message" />
          </Form.Group>
          <Button style={{ height: "60px" }} variant="success" type="submit">
            Send
          </Button>
        </Form>
      </div >
    );
  }

  private handleKeyPress = (e: any) => {
    if (e.charCode === 13) {
      this.props.handleSubmit(e);
    }
  }
}

export default ChatMessageInputForm;
