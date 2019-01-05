import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Button, Input, FormGroup, Form } from 'reactstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Url from "./configure";
import axios from "axios";

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            responseData: []
        };
        this.UpdateImage = this.UpdateImage.bind(this);
    }

    UpdateImage(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('image', this.state.image);
        axios.post(Url.baseUrl + "/image", formdata)
            .then((res) => {

                this.setState({
                    responseData: res.data,
                });
            })
    }





    handleChange = (e) => {

         this.setState({ image: e.target.files[0] });
    }

    render() {

        return (
            <div className="container-fluid todo_App">
                <Row>
                    <Col sm="9">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col sm="6">Upload Image</Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div>
                                    <Form onSubmit={this.UpdateImage}>
                                        <FormGroup>
                                            <Input
                                                type="file"
                                                name="image"
                                                id="image"
                                                placeholder="image"
                                                onChange={this.handleChange}
                                                encType="multipart/form-data"
                                             />
                                        </FormGroup>
                                        <FormGroup>
                                            <img src={'/image'} alt=""/>
                                        </FormGroup>
                                        <Button color="primary">Upload Image</Button>
                                    </Form>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default ImageUpload;
