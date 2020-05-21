import React from 'react'
import ProjectList from './components/ProjectList'
// import {Card , ButtonToolbar} from 'react-bootstrap'


export class Favorite extends React.Component{


/*front end way */
// state={
//     favorites:[]
    
    // [{
    //     "id": 85,
    //     "user": {....},
    //     "project": {...},
    // }]
  
// }
// componentDidMount(){
    // fetch('http://localhost:3000/favorites')
    // .then(resp => resp.json())
    // .then(list => {
    //     // List[Promise] -> Promise[List]
    //     // loop through each of the list in favorites
    //     return Promise.all(list.map(l => {
    //         const {user_id, project_id, id} = l
    //         // console.log(id ,"fav_id")

    //         // fetch both user and projectId
    //         const fetchUser = fetch(`http://localhost:3000/users/${user_id}`)
    //         const fetchProject = fetch(`http://localhost:3000/projects/${project_id}`)
    //         return Promise.all([fetchUser,fetchProject])
    //         .then(([userJson, projectJson]) => {
    //             // get the payload result in Json
    //             return Promise.all([userJson.json(), projectJson.json()])
    //         })
    //         // aggregate the user, project inside a single object
    //         .then(([user, project]) => {
    //             // console.log(user, project)
    //             return {
    //                 id,
    //                 user: { ...user },
    //                 project: {...project}
    //             }
    //         })
    //     }))
    // })
    // // set state
    // .then(allFulfilled => {
    //     console.log(allFulfilled)
    //     this.setState({
    //         favorites: allFulfilled
    //     })
    // })

// }



render(){
    const favorite_projects = this.props.projects.filter(project => project.favorites.some((fav)=> fav.user_id  === 1))
    const search=favorite_projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))

// console.log(favorite_projects)
        return(
            <>
        {
              favorite_projects &&  

             <ProjectList
              users={this.props.users} 
              projects={search} 
              comments={this.props.comments} 
              handleFavorite={this.props.handleFavorite} 
              handleFavoriteDel={this.props.handleFavoriteDel}
              handleLike={this.props.handleLike}
              handleComment={this.props.handleComment}
              handleDelComment={this.props.handleDelComment}

             
             />

        }
              
               
            
            </>
           
        )
    }
}






