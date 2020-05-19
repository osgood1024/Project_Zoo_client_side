import React from 'react'
import ProjectList from './components/ProjectList'



export class Home extends React.Component{
   





    render(){

        const search=this.props.projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
        
        return(
            <div>
               <ProjectList 
                handleLike={this.props.handleLike}
                projects={search} 
                comments={this.props.comments}
                users={this.props.users}
                handleFavorite={this.props.handleFavorite}
                handleFavoriteDel={this.props.handleFavoriteDel}
                handleComment={this.props.handleComment}
                handleDelComment={this.props.handleDelComment}
                />
            </div>
        )
    }
} 