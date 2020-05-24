import React from 'react'
import styled from 'styled-components'
import ProjectDetail from './ProjectDetail'
import {Spring} from 'react-spring/renderprops'






const Styles =styled.div `

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-content: space-around;
    
  }

`

class ProjectList extends React.Component{


    render(){

        return(
            <Styles >

            <Spring
                from={{opacity: 0 ,  marginLeft:-20 , transform: 'translate3d(-20px,0,0)'}}
                to={{opacity: 1,  marginLeff:20, transform: 'translate3d(0px,0,0)'}}
                config={{delay: 500, duration:500}}
            >

{props => (
     <div style={props}>

            <div className={'container'}>
            {this.props.projects.map(project => <div style={{padding:'0px', margin:"50px 10px 10px 10px"}}>
                     
                        <ProjectDetail 
                        key={project.id} 
                        favorite={this.props.favorites}
                        users={this.props.users}
                        project={project}
                        comment={this.props.comments.filter(c => c.project_id === project.id)} 
                        handleLike={this.props.handleLike}
                        handleFavorite={this.props.handleFavorite}
                        handleFavoriteDel={this.props.handleFavoriteDel}
                        handleComment={this.props.handleComment}
                        handleDelComment={this.props.handleDelComment}

                        />
                        </div>
                    )
            }
            </div>

    </div>
)}
            </Spring>
                    
            </Styles>
           
        )
    }
}


export default ProjectList



