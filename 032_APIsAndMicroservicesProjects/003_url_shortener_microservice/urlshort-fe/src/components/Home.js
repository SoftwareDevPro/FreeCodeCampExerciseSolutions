
import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Col, Container, Row } from "reactstrap";
import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: '',
      result: ''
    }

    this.getUrl = this.getUrl.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
  }

  updateUrl = (evt) => {
    this.setState({ url: evt.target.value });
    console.log(evt.target.value)
  }

  getUrl = () => {
    axios.post(API_URL, { original_url: this.state.url })
         .then(res => this.setState({ result: JSON.stringify(res.data) }));
  }

  render() {
    return (
      <Container style={{ marginTop: "40px" }}>
        <Form >
          <FormGroup>
            <Row>
              <Col md={2}>
                <Label for="">URL to be shortened</Label>
              </Col>
              <Col sm={6}>
                <Input onChange={this.updateUrl} type="text" name="original_url" id="original_url" placeholder="http://www.freecodecamp.org" />
              </Col>
              <Col>
                <Button id="get_url_button" onClick={this.getUrl}>Post URL</Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "40px" }}>
              <div id="result">{this.state.result}</div>
            </Row>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default Home;