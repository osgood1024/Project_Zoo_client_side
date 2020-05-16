import React, {Component} from 'react'
import {Modal, Button, Image, ListGroup, ListGroupItem, Form, Col, Container} from 'react-bootstrap';
import CommentList from './CommentList'
import Emoji from 'a11y-react-emoji'



 class ProjectDetail extends Component {

  state={
    likes: this.props.project.like
  }

  // **PATCH method for updating like button and save it into database**

//   handleClick=()=> {
//       let project_id= this.props.project.id
//       let count =  this.state.likes +1
//       console.log(project_id)
//     fetch(`http://localhost:3000/projects/${project_id}`,{
//       method: "PATCH",
//       headers:{
//         "content-type" :"application/json",
//         accepts: "application/json"
//     },
//     body: JSON.stringify({
//         likes: count
//     })
//   })
//     .then(resp => resp.json())
//     .then(newLikes => this.setState ({
//       likes: newLikes
//     })
//     ) 
// }
 

handleLike=()=>{
  
  let countLike= this.state.likes +1
  this.setState({
    likes : countLike
  })
}


 
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

              <p>
            <Button style={{margin: '5px'}} onClick={()=> this.handleLike()} variant="outline-dark"> <Emoji symbol="❤"/>Like</Button> <Button variant="outline-dark">  <Emoji symbol="⭐"/> Add to Favorite</Button>
              </p>

              <p>
                <Image src={this.props.project.image} fluid />
              </p>

      <Container>
              <p>
                {this.props.project.description}
              </p>

              <p>
                Like: {this.state.likes} 
              </p>

              <p>
                  Owner:
              </p>

              <p>
                <a href = {this.props.project.link} target= "_blank" rel="noopener noreferrer" >
                  Visit Project
                </a>
              </p>
      </Container>

<Container>
          <h4>Discussion</h4>
          
          <Form.Control as="textarea" rows="3" onSubmit={null} placeholder="What are your thought in this project..? "/>
          <br/>
          <Button variant="outline-dark"  className="rounded-pill" style={{float: 'right'}} type="submit" >Post</Button>
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