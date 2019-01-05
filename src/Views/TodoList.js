import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Button, Input, FormGroup, Form, Label } from 'reactstrap';
import { Icon } from 'react-fa';
import { Link,withRouter } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Url from "./configure";
import axios from "axios";


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      content: '',
      items: [],
      itemdata: []
    };
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.myfun = this.myfun.bind(this);
  }
  componentWillMount() {
    axios.get(Url.baseUrl + "/allTodo")
      .then(res => {
        this.setState({ items: res.data });
      })
  }
  handleDeleteTask(id) {
    var r = window.confirm("Confirm Delete Admin!");
    if (r === true) {
      axios.delete(Url.baseUrl + "/deleteTodo/" + `${id}`);
    }
    setTimeout(() => {
      axios.get(Url.baseUrl + "/allTodo")
        .then(res => {
          this.setState({ person: res.data });
        })
    }, 200);
  }

  myfun(row) {
    this.setState({ itemdata: row });
  }
  handleImage(id) {

    window.location.href = `/uploadImage/${id}`;
  }

  render() {
    console.log(this.props.data)
    const colFormatter = (cell, row, value) => {
      const id = `${row._id}`
      return (
        <div>
          <Button onClick={(e) => { this.handleDeleteTask(id) }}>Delete</Button> <Button onClick={(e) => { this.handleImage(id) }}>Upload image</Button>
        </div>
      )
    }

    const colFormatter1 = (cell, row, value) => {
      return (
        <Link to={`/todo_list`} onClick={(e) => this.myfun(row)}>{cell}</Link>
      )
    }

    return (
      <div>

        <div className="container-fluid todo_App">
          <Row>
            <Col sm="9">
              <Card>
                <CardHeader className="add_task_cardheader">
                  <Row>
                    <Col sm="11">Task List</Col>
                    <Col sm="1">
                      <span>
                        <Link to="/add_New_Todo"><Icon name="plus" /></Link>
                      </span>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <BootstrapTable data={this.state.items} striped hover search >
                    <TableHeaderColumn isKey={true} dataField='Id'>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='content' dataFormat={colFormatter1}>TaskName</TableHeaderColumn>
                    <TableHeaderColumn width="250" dataFormat={colFormatter} >Action</TableHeaderColumn>
                  </BootstrapTable>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Todos data={this.state.itemdata} />
        </div>
      </div>
    );
  }
}

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editbtn: false,
      _Id: '',
      Id: '',
      content: '',
      responseData: '',
      items: ''
    };
    this.editForm = this.editForm.bind(this);
    this.UpdateTodo = this.UpdateTodo.bind(this);
  }
  editForm() {
    document.getElementById("todoId").disabled = false;
    document.getElementById("todoContent").disabled = false;
    this.setState({
      editbtn: true,

    })
  }
  UpdateTodo(e) {
    e.preventDefault();
    const { _Id, Id, content } = this.state;
    const OptionsData = {
      id: Id,
      content: content
    }
    axios.put(Url.baseUrl + "/updateTodo/" + `${_Id}`, OptionsData)

      .then(res => {
        this.setState({ items: res });
      })
  }

  changeInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      _Id: nextProps.data._id,
      Id: nextProps.data.Id,
      content: nextProps.data.content,
      responseData: nextProps.data
    })
  }
  render() {
    console.log("loggg in")
    const { Id, content } = this.state;

    return (
      <div className="container-fluid todo_App">
        <Row>
          <Col sm="9">
            <Card>
              <CardHeader>
                {this.props.data === "" ? "" :
                  <Row>
                    <Col sm="6">Update Todos</Col>
                    <Col sm="6">
                      <i className="fa fa-edit edit_icon_todos" onClick={this.editForm} />
                    </Col>
                  </Row>
                }
              </CardHeader>
              <CardBody>
                {this.props.data === "" ? "Loading..." :
                  <div>
                    <Form onSubmit={this.UpdateTodo}>
                      <FormGroup>
                        <Label for="Task" hidden>Task</Label>
                        <Input
                          type="id"
                          name="Id"
                          id="todoId"
                          placeholder="id"
                          value={Id}
                          onChange={this.changeInput}
                          disabled
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="content"
                          name="content"
                          id="todoContent"
                          placeholder="content"
                          value={content}
                          onChange={this.changeInput}
                          disabled
                        />
                      </FormGroup>
                      <Button color="primary">Save</Button>
                    </Form>
                  </div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
// polyfill(TodoList);

export default withRouter(TodoList);
