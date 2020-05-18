import React, {Component} from 'react'
import {Modal, Button, Image, Card, Form, Container} from 'react-bootstrap';
import CommentList from './CommentList'
import Emoji from 'a11y-react-emoji'



 class ProjectDetail extends Component {

  state={
    setModalShow: false,
    toggle: true
  }


onClose = (e) => {
 this.setState({
   setModalShow : false
 })
}

setModalClose=()=>{
  this.setState({
      setModalShow: false
  })
}

handleLikes = (e) => {
  const {id, like} = this.props.project
  const {handleLike} = this.props
if(this.state.toggle){
  handleLike(id, like +1 )
}
else{
  handleLike(id, like -1)
}

  this.setState({

    toggle :!this.state.toggle
  })
}


// handleToggle=()=>{
//   this.setState({

//     toggle :!this.state.toggle
//   })
// }
 
 
    render(){
      const {project} = this.props;
      const {setModalShow} = this.state;
      console.log('setModalShow status in projectDetail', setModalShow)
    
        return(
          <>
          <Card border="dark" style={{ width: '18rem' , height:'15rem'}} onClick={() =>this.setState({setModalShow: true })}>
              <Card.Body style={{padding:'10px'}}>
                  <Card.Title>{project.name}</Card.Title>
                  <Card.Img variant="top" src={project.image}/>
              </Card.Body>
          </Card> 

             <Modal
            show = {setModalShow}
            onHide = {this.onClose}
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
            <Button style={{margin: '5px'}} onClick={this.handleLikes} variant="outline-dark" > 
            {/* <Emoji symbol="❤"/> */}
            {
              this.state.toggle ? "❤Like" : "Unlike"
            }
            </Button> 
            <Button variant="outline-dark">  <Emoji symbol="⭐"/> Add to Favorite</Button>
              </p>

              <p>
                <Image src={this.props.project.image} fluid />
              </p>

      <Container>
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
      </Container>
<br/>
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
                    </Form.Row>(
                    <br />
                  </Form.Group>

          Comment:
            <p>
             {this.props.comment.map(c => <p> {c.content} </p> )}
            </p>
        
            </div> */}

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.onClose}>Close</Button>
            </Modal.Footer>
          </Modal>
      </>

        )
    }
    
}

export default ProjectDetail