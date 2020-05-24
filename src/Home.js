import React from 'react'
import ProjectList from './components/ProjectList'
import {Spring} from 'react-spring/renderprops'





export class Home extends React.Component{
    
    render(){

        const search=this.props.projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
        
        return(
            <Spring
            from={{opacity: 0 ,  marginLeft:-20 , transform: 'translate3d(0,-40px,0)'}}
            to={{opacity: 1,  marginLef:20, transform: 'translate3d(0,0px,0)'}}
            
            config={{delay: 500, duration:1000}}
            >
                {props => (
                <div style={props}>

            <div>
               <ProjectList 
                projects={search} 
                favorites={this.props.favorites}
                comments={this.props.comments}
                users={this.props.users}
                handleLike={this.props.handleLike}
                handleFavorite={this.props.handleFavorite}
                handleFavoriteDel={this.props.handleFavoriteDel}
                handleComment={this.props.handleComment}
                handleDelComment={this.props.handleDelComment}
                />
            </div>
         </div>
                )}
            </Spring>
        )
    }
} 