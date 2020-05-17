import React from 'react'
import {Card , ButtonToolbar} from 'react-bootstrap'
import ProjectDetail from './ProjectDetail'

class ProjectList extends React.Component{

// state={
//     setModalShow: false
// }



//   setModalClose=()=>{
//     this.setState({
//         setModalShow: false
//     })
// }


    render(){
        return(
            
            <>
            
            {this.props.projects.map((project) => {
                    return (
                        <>
                        <ProjectDetail 
                        key={project.id} 
                        project={project}
                        comment={this.props.comments.filter(comment => comment.project_id === project.id)} 
                        addLikes={this.props.addLikes}/> 
                        </>
                    )
                })
            }
            </>
           
        )
    }
}


export default ProjectList



