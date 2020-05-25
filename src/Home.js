import React from 'react'
import ProjectList from './components/ProjectList'



export class Home extends React.Component{


    render(){
        const {category} = this.props;

        const searchFilter = this.props.projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
        
        const search = category  === 'all' ? searchFilter : searchFilter.filter(project => project.category.toLowerCase() === category)
        
        return(
           
            <div>
               <ProjectList 
                projects={search} 
                filterProject={this.props.filterProject}
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