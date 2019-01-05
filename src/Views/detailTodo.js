
import React,{useState} from 'react';
import {Row ,Col} from 'reactstrap';

const Test=(props)=>{
 const [name,setName] = useState('priyanka')

  const handleChnageInput=(e)=>{
    setName(e.target.value)
 }
     return(
        <section>
          <Row>
            <Col>
              <input
               value="{name}"
               onChange={handleChnageInput}
              />
             </Col>
          </Row>
        </section>
    );
  }
export default Test;
