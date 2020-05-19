import React from 'react'
// import {Card , ButtonToolbar} from 'react-bootstrap'
import ProjectDetail from './ProjectDetail'

class ProjectList extends React.Component{


    render(){

        return(
            <>
            
            {this.props.projects.map(project => 

                        // project.name &&
                        <ProjectDetail 
                        key={project.id} 
                        project={project}
                        comment={this.props.comments.filter(comment => comment.project_id === project.id)} 
                        handleLike={this.props.handleLike}
                        handleFavorite={this.props.handleFavorite}
                        handleFavoriteDel={this.props.handleFavoriteDel}
                        /> 
                        // :
                        // <ProjectDetail 
                        // key={project.id} 
                        // project={project}
                        // comment={this.props.comments.filter(comment => comment.project_id === project.id)} 
                        // handleLike={this.props.handleLike}
                        // handleFavorite={this.props.handleFavorite}
                        // handleFavoriteDel={this.props.handleFavoriteDel}
                        // /> 

                       
                    )
            }
            </>
           
        )
    }
}


export default ProjectList



