import React from 'react'
import styled from 'styled-components'
import ProjectDetail from './ProjectDetail'
import {Spring} from 'react-spring/renderprops'
import Select from 'react-select';


const Styles =styled.div `

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-content: space-around;
    
  }

.select{
    margin: 0px 30px 20px 0px;
    width: 200px;
    float: right;
}


`





class ProjectList extends React.Component{

    
    render(){
        const options = [
            { value: 'technology', label: 'technology' },
            { value: 'health', label: 'health' },
            { value: 'entertainment', label: 'entertainment' },
            { value: 'design tool', label: 'design tool' },
            { value: 'portfolio', label: 'portfolio' },
            { value: 'education', label: 'education' },
            { value: 'game', label: 'game' },
            { value: 'productivity', label: 'productivity' },
            { value: 'news', label: 'news' },
            { value: 'other', label: 'other' },
            { value: 'all', label: 'All' },
          ];

        return(
            <Styles >

            <Spring
                from={{opacity: 0 ,  marginLeft:-20 , transform: 'translate3d(-20px,0,0)'}}
                to={{opacity: 1,  transform: 'translate3d(0px,0,0)'}}
                config={{delay: 500, duration:1000}}
            >

{props => (
     <div style={props} >
         


<div className={"select"}>
    
   <p> Filter By:</p>
        <Select 
        defaultValue={options[10]}
        options={options}
        onChange={(e) =>  this.props.filterProject(e.value) }
        />


</div>


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



