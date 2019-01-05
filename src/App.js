import React, { Component } from 'react';
import TodoList from './Views/TodoList';
import AddTodo from './Views/addTodo';
import Login from './Views/Login';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import history from "./helper/history";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ConfirmMail from './Views/ConfirmMail';
import ForgetPass from './Views/ForgetPass';
import UploadImage from './Views/UploadImage';
import { getCookie } from './helper/cookie';
import Agrid from './Ag_grid';

import Header from './Views/header';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerflag:""
    }
  }

  test=(abc)=>{
    console.log("abc",abc);
    this.setState({
       headerflag:abc 
    })
  }
//   static getDerivedStateFromProps(props, state){
// console.log(props,"props")

//   }
  render() {
    const GetCookie=getCookie('user');
    console.log("app",this.state);
    console.log("GetCookie",GetCookie)
 
    return (
      <div className="main_div">
        <BrowserRouter>
          <>
            {
            GetCookie?
            <>
            <Header data={this.test} />
            <Route exact path="/todo_list"  component={() => <TodoList data={this.test}/>}  />
            <Route exact path="/add_New_Todo" component={AddTodo} />
            <Route exact path="/confirmMail" component={ConfirmMail} />
            <Route exact path="/forgetPassword/hhhhhhhhhhhh" component={ForgetPass} />
            <Route exact path="/uploadImage/:id" component={UploadImage} />
            </>
            :
            <>
            <Route exact path="/" component={() => <Login data={this.test}/>}/>
            </  >
            }
          </>
        </BrowserRouter>
        {/* <Router history={history}>
          <>
            <Header />
            <Route exact path="/" component={Login} />
            <Route exact path="/todo_list" component={TodoList} />
            <Route exact path="/add_New_Todo" component={AddTodo} />
            <Route exact path="/confirmMail" component={ConfirmMail} />
            <Route exact path="/forgetPassword/hhhhhhhhhhhh" component={ForgetPass} />
            <Route exact path="/uploadImage/:id" component={UploadImage} />
          </>
        </Router> */}

      </div>
    );
  }
}

export default App;
