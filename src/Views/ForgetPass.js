import React, { Component } from 'react';
import {Card,CardBody,CardHeader,Row,Col,Button, Form, FormGroup, Label, Input   } from 'reactstrap';
import Url from "./configure";
import axios from "axios";

class ForgetPass extends Component {
  constructor(props){
    super(props);
    this.state={
        newpassword:'',
        confirmpassword:'',
        responseData:[],
        token:'',
        email: '',


     }
     this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault()
    let urlLink=window.location.href;
    let accessValue = new URL(urlLink);
    let token= accessValue.searchParams.get("token");
    let emailValue=accessValue.searchParams.get("email");
      this.setState({
      token:token,
      email:emailValue
  });
   const data={
    password:this.state.newpassword,
    token:token
   }
    axios.post(Url.baseUrl+"/changePassword",data)
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
    const {newpassword,confirmpassword}=this.state;

    return (
      <div className="container-fluid">
        <Row className="Login_row">
         <Col sm="3"></Col>
          <Col sm="6">
            <Card>
              <CardHeader>Welcome to Forget Password</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                      <Label for="newPassword" hidden>New Password</Label>
                      <Input
                        type="newPassword"
                        name="newpassword"
                        id="newPassword"
                        value={newpassword}
                        placeholder="New Password"
                        onChange={this.handleChange}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                      <Label for="email" hidden>Confirm Password</Label>
                      <Input
                        type="confirmpassword"
                        name="confirmpassword"
                        id="confirmpassword"
                        value={confirmpassword}
                        placeholder="Confirm password"
                        onChange={this.handleChange}
                        required
                        />
                    </FormGroup>
                  <Button>Submit</Button>
                  </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ForgetPass;
