import React from 'react'
import ProjectList from './components/ProjectList'
// import {Card , ButtonToolbar} from 'react-bootstrap'


export class Favorite extends React.Component{

state={
    favorites:[], // [{
    //     "id": 85,
    //     "user": {....},
    //     "project": {...},
    // }]
    comments:[],
    users:[]
  
}
componentDidMount(){

    // let user_favorite= this.state.favorite.filter(project => project.user_id === 31)
    // fetch('http://localhost:3000/favorites')
    // .then(resp => resp.json())
    // .then(fetch(`http://localhost:3000/projects`)
    // .then(resp => resp.json())
    // .then(list => this.setState({

    //     favorite: list
    // }))
        
    // )

    fetch('http://localhost:3000/favorites')
    .then(resp => resp.json())
    .then(list => {
        // List[Promise] -> Promise[List]
        // loop through each of the list in favorites
        return Promise.all(list.map(l => {
            const {user_id, project_id, id} = l
            // console.log(id ,"fav_id")
            // fetch both user and projectId
            const fetchUser = fetch(`http://localhost:3000/users/${user_id}`)
            const fetchProject = fetch(`http://localhost:3000/projects/${project_id}`)
            return Promise.all([fetchUser,fetchProject])
            .then(([userJson, projectJson]) => {
                // get the payload result in Json
                return Promise.all([userJson.json(), projectJson.json()])
            })
            // aggregate the user, project inside a single object
            .then(([user, project]) => {
                // console.log(user, project)
                return {
                    id,
                    user: { ...user },
                    project: {...project}
                }
            })
        }))
    })
    // set state
    .then(allFulfilled => {
        // console.log(allFulfilled)
        this.setState({
            favorites: allFulfilled
        })
    })


    fetch('http://localhost:3000/comments')
    .then(resp => resp.json())
    .then(commented => this.setState({
        comments: commented
    }))

    fetch('http://localhost:3000/users')
    .then(resp=>resp.json())
    .then(user => this.setState({
        users: user
    })
    )






}




render(){
    const projects = this.state.favorites.filter(fav => fav.user.id  === 31).map(fav => fav.project)

        return(
            <>
        
        {
            
             projects &&  <ProjectList users={this.state.users} projects={projects} comments={this.state.comments}  />

        }
              
               
            
            </>
           
        )
    }
}






