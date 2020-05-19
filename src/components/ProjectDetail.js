import React, {Component} from 'react'
import {Modal, Button, Image, Card, Form, Container} from 'react-bootstrap';
import CommentList from './CommentList'
// import Emoji from 'a11y-react-emoji'



 class ProjectDetail extends Component {

  state={
    setModalShow: false,
    toggle: true,
    toggleFav: true
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

handleFavoriteList = () =>{
    const{id}=this.props.project
    const{handleFavorite,handleFavoriteDel}=this.props

    if(this.state.toggleFav){
      handleFavorite(id)
    }else{
      handleFavoriteDel(id)
    }
    this.setState({
      toggleFav : !this.state.toggleFav
    })
}

handleComments =() =>{
  const{id}=this.props.project
  const{handleComment}=this.props
  handleComment(id)
}

 
 
    render(){
      const {project} = this.props;
      const {setModalShow} = this.state;
      // console.log('setModalShow status in projectDetail', setModalShow)
      let userName= this.props.users.filter(u => u.id === project.user_id).map(u => u.username)

      let commentList=this.props.comment.filter(c => c.project_id=== project.id)

      // console.log(commentList)
      
    
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

            <Button variant="outline-dark" onClick={this.handleFavoriteList}> 
             {/* <Emoji symbol="⭐"/>  */}
             {
               this.state.toggleFav ? "⭐Add to Favorite" : "Remove from Favorite"
             }
            
            </Button>
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
                  Owner: {userName}
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
          
          <Form.Control as="textarea" rows="3" name="content" onChange={this.props.handleChange} onSubmit={this.handleComments} placeholder="What are your thought in this project..? "/>
          <br/>
          <Button variant="outline-dark"  className="rounded-pill" style={{float: 'right'}} type="submit" >Post</Button>
          <br/>
          <br/>
          <CommentList comments={commentList.map(c => 
          <p> 
          <h5>{c.user_id}:</h5> 
          {c.content}<hr /> 
          </p> 
          )

          }/>

</Container>

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