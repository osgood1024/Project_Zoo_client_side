import React from 'react'
import {Card , ButtonToolbar} from 'react-bootstrap'
import ProjectDetail from './ProjectDetail'

class ProjectContainer extends React.Component{

state={
    setModalShow: false
}

  setModalClose=()=>{
    this.setState({
        setModalShow: false
    })
}


    render(){
        // console.log(this.props.comment.map(c => c.content))
        return(
            <ButtonToolbar>
            <Card border="dark" style={{ width: '18rem' , height:'15rem'}} onClick={() =>this.setState({setModalShow: true })}>
                <Card.Body style={{padding:'10px'}}>
                <Card.Title>{this.props.project.name}</Card.Title>
                <Card.Img variant="top" src={this.props.project.image}/>
                </Card.Body>
            </Card> 
                <ProjectDetail
                project={this.props.project}
                comment={this.props.comment}
                show={this.state.setModalShow}
                onHide={this.setModalClose}
                />
            </ButtonToolbar>
         
        )
    }
}


export default ProjectContainer