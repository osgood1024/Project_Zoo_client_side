import React from 'react'
import styled from 'styled-components'
import ProjectDetail from './ProjectDetail'
// import {Spring} from 'react-spring/renderprops'






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


                    
            </Styles>
           
        )
    }
}


export default ProjectList



