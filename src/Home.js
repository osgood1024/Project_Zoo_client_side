import React from 'react'
import ProjectContainer from './components/ProjectContainer'



export class Home extends React.Component{


    render(){
        return(
            <div>
               {this.props.projects.map(project =><ProjectContainer key={project.id} project={project} comment={this.props.comments.filter(comment => comment.project_id === project.id)} />)}
            </div>
        )
    }
} 