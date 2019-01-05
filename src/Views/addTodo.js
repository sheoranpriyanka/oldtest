import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Url from "./configure";
import axios from "axios";


class AddTodo extends Component {
  constructor() {
    super()
    this.state = {
      content: '',
      id: '',
      responseData: []
    }
    this.changeInput = this.changeInput.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }


  changeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }


  addTodo(e) {
    e.preventDefault()
    const newTodo = {
      content: this.state.content,
      id: this.state.id
    }

    axios.post(Url.baseUrl + "/addTodo", newTodo)
      .then(res => {
        this.setState({
          responseData: res,
          content: '',
          id: '',
        })
      })
  }
  render() {
    if (this.state.responseData.status === 200) {
      return (
        <Redirect to="/todo_list" />
      )
    }
    return (
      <div className="container-fluid todo_form">
        <Row>
          <Col sm="9">
            <Card>
              <CardHeader >Add Task</CardHeader>
              <CardBody>
                <Form onSubmit={this.addTodo}>
                  <FormGroup>
                    <Label for="Task" hidden>Task</Label>
                    <Input
                      type="id"
                      name="id"
                      id="id"
                      placeholder="id"
                      value={this.state.id}
                      onChange={this.changeInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="content"
                      name="content"
                      id="content"
                      placeholder="content"
                      value={this.state.content}
                      onChange={this.changeInput}
                    />
                  </FormGroup>

                  <Button>Add Task</Button><Link to="/todo_list"> Back to List</Link>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AddTodo;
