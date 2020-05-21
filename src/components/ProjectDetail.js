import React, {Component} from 'react'
import {Modal, Button, Image, Card, Form, Container} from 'react-bootstrap';
import CommentList from './CommentList'
import styled from 'styled-components'
// import Emoji from 'a11y-react-emoji'

const Styles =styled.div `

.card{    
  border-radius: 15px;
}

.card:hover{
  transform:scale(1.1);
}

.show_name{
  color: white;
  font-size: 20px ;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  border-radius: 15px;
  background-color: black;
}


.container:hover .overlay {
  opacity: 0.85;
}

// .container:hover .card-img {
//   opacity: 0.3;
// }

// .card-title{
//   font-family: 'Do Hyeon', sans-serif;
// }


`


 class ProjectDetail extends Component {

  state={
    setModalShow: false,
    toggle: true,
    toggleFav: true,
    description:""
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
  handleLike(id, like -1 )
}

  this.setState({

    toggle :!this.state.toggle
  })
}

handleFavoriteList = () =>{
    const{id}=this.props.project
    
    const{handleFavorite,handleFavoriteDel}=this.props

    // let favorite_id=this.props.project.favorites.filter(f => f.id === favid.id)

    if(this.state.toggleFav){
      handleFavorite(id)
    }
    else{
      console.log(id)
      console.log(this.props.project.favorites)
      handleFavoriteDel(id, this.props.project.favorites.find(f => f.user_id === this.props.user.id).id)

    }
    this.setState({
      toggleFav : !this.state.toggleFav
    })
}

handleChange=(e)=>{
  this.setState({
      [e.target.name] : e.target.value
  })
}



handleSubmit = () =>{
  const{id}=this.props.project
  const{handleComment}=this.props

  handleComment(1,id,this.state.description)

  this.setState({
    description:""
  })
}


 
 
    render(){
      const {project} = this.props;
      const {setModalShow} = this.state;
      
      // console.log(this.props.project.favorites.map(f => f.id))
      // console.log(this.props.project)
      let userName= this.props.users.filter(u => u.id === project.user_id).map(u => u.username)  


        return(
          <>
          <Styles>
          <Card border="dark" className={"container"} style={{ width: '18rem' , height:'15rem'}} onClick={() =>this.setState({setModalShow: true })}>
                  <Card.Img variant="top"  style={{ display: "block" , width: '100%' , height:'70%'}} src={project.image}/>
              <Card.Body className={"overlay"} style={{padding:'10px'}}>
                  <Card.Title className={"show_name"} >{project.name}</Card.Title>
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

            <Button variant="outline-dark" onClick={()=>this.handleFavoriteList()}> 
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
          
          <Form.Control as="textarea" rows="3" name="description" value={this.state.description} onChange={this.handleChange} placeholder="What are your thought in this project..? "/>
          <br/>
          <Button variant="outline-dark"  className="rounded-pill" style={{float: 'right'}} type="submit" onClick={this.handleSubmit} >Post</Button>
          <br/>
          <br/>



          <CommentList comments={this.props.comment.map(c => 
            
          <p> 

          <Button type="button" className="close" aria-label="Close" onClick={()=>this.props.handleDelComment(c.id)}>
            <span aria-hidden="true">&times;</span>
          </Button>

          <h5>@{c.user.username}:</h5> 

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

          </Styles>
      </>

        )
    }
    
}

export default ProjectDetail