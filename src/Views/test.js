import React from 'react';
import {Row ,Col,Label} from 'reactstrap';
//import {App} from './detailTodo';

export default class Test extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'priyanka',
      surname:'sheoran',
      width:window.innerWidth,
    }
    this.handleChnageInput=this.handleChnageInput.bind(this )
    this.handleChnageInput1=this.handleChnageInput1.bind(this )
    this.handleResize=this.handleResize.bind(this )
  }
  handleChnageInput(e){
    this.setState({
      name:e.target.value
    });
  }
  handleChnageInput1(e){
    this.setState({
            surname:e.target.value
      });
  }

  handleResize(e){
    this.setState({
            width:window.innerWidth
      });
  }
  componentDidMount(){
    document.title=this.state.name+' '+this.state.surname;
    window.addEventListener('resize',this.handleResize);
   }
  componentDidUpdate(){
    document.title=this.state.name+' '+this.state.surname
  }
   componentDidUnmount(){
     window.removeEventListener('resize',this.handleResize);
  }
  render(){
      return(
        <section>
          <Row>
            <Col>
              <Label>Name:</Label><br/>
              <input
               value={this.state.name}
               onChange={this.handleChnageInput}
              />
             </Col>
          </Row>
          <Row>
            <Col>
              <Label>SurName:</Label><br/>
              <input
               value={this.state.surname}
               onChange={this.handleChnageInput1}
              />
             </Col>
          </Row>
          <Row>
            <Col>
              <Label>Width:</Label><br/>
              {this.state.width}
             </Col>
          </Row>
        </section>
    )
  }
}
