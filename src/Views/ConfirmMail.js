import React, { Component } from 'react';
import {Card,CardBody,CardHeader,Row,Col,Button, Form, FormGroup, Label, Input   } from 'reactstrap';
import Url from "./configure";
import axios from "axios";
import {Link} from "react-router-dom";

class ConfirmMail extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      responseData:[],
     }
     this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault()
   const data={
     email:this.state.email
   }
    axios.post(Url.baseUrl+"/forgetPassword",data)
      .then((res) => {

        this.setState({
          responseData: res.data ,

        });
     })
  }


  handleChange=(event)=>{
      let {name,value}=event.target;
      this.setState({[name]:value})
  }
  render() {
    const {email}=this.state;

    return (  
      <div className="container-fluid">
        <Row className="Login_row">
         <Col sm="3"></Col>
          <Col sm="6">
            <Card>
              <CardHeader>Welcome to Confirm Mail</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                      <Label for="email" hidden>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email_login"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                        required
                        />
                    </FormGroup>
                  <Button>Submit</Button>
                  <Link to="/">Back to Login</Link>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ConfirmMail;
