import React from 'react'
import ProjectList from './components/ProjectList'





export class Home extends React.Component{
    render(){

        console.log(this.props.projects)
        const search=this.props.projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
        
        return(
           
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
       
        )
    }
} 