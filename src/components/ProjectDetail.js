import React, {Component} from 'react'
import {Modal, Button, Image, ListGroup, ListGroupItem, Form, Col, Container} from 'react-bootstrap';
import CommentList from './CommentList'



 class ProjectDetail extends Component {

 
    render(){
    
        return(
             <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.props.project.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               
             <Image src={this.props.project.image} fluid />
              <p>
              {this.props.project.description}
              </p>
              <p>
              Like: {this.props.project.like} 
              </p>
            <p>
                Owner:
            </p>

            <p>
              <a href = {this.props.project.link} target= "_blank" rel="noopener noreferrer" >
                Visit Project
              </a>

            </p>

<Container>
          <h4>Discussion</h4>
          
          <Form.Control as="textarea" rows="3" placeholder="What are your thought in this project..? "/>
          <br/>
          <Button variant="outline-dark" type="submit" >Post</Button>
          <br/>
          <br/>
          <CommentList comments={this.props.comment.map(c => 
          <p> <h5>user name:</h5> {c.content}<hr /> </p> )
          
          }/>

</Container>


{/* 
            <div>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={1.5}>
                       
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="What are your thought in this project..? " />
                      </Col>
                    </Form.Row>
                    <br />
                  </Form.Group>

          Comment:
            <p>
             {this.props.comment.map(c => <p> {c.content} </p> )}
            </p>
        
            </div> */}

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>

        )
    }
    
}

export default ProjectDetail