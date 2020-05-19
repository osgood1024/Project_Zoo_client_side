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
                        contents={this.props.contents}
                        users={this.props.users}
                        project={project}
                        comment={this.props.comments.filter(c => c.project_id === project.id)} 
                        handleLike={this.props.handleLike}
                        handleFavorite={this.props.handleFavorite}
                        handleFavoriteDel={this.props.handleFavoriteDel}
                        handleComment={this.props.handleComment}
                        handleDelComment={this.props.handleDelComment}

                        /> 

                       
                    )
            }
            </>
           
        )
    }
}


export default ProjectList



