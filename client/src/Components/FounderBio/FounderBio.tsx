import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export interface IFounderBioProps {
  bioImage: string;
  bioName: string;
  bioDescription: string;
}

class FounderBio extends Component<IFounderBioProps> {
  constructor(props: IFounderBioProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <Card
        style={{
          border: "none",
          padding: "0px",
          width: "500px"
        }}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "26px", color: "black" }}>
            {this.props.bioName}
          </Card.Title>
          <Card.Img
            style={{
              alignItems: "center",
              display: "block",
              height: "150px",
              justifyContent: "center",
              margin: "auto",
              padding: "5px",
              width: "150px"
            }}
            src={this.props.bioImage}
          />
          <Card.Text
            style={{
              color: "black",
              fontSize: "14px"
            }}
          >
            {this.props.bioDescription}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default FounderBio;
