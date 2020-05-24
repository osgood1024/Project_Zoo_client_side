import React from 'react'
import ProjectList from './components/ProjectList'
import {Spring} from 'react-spring/renderprops'



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

        return(

<Spring
from={{opacity: 0 ,  marginLeft:-20 , transform: 'translate3d(0,-40px,0)'}}
to={{opacity: 1,  marginLef:20, transform: 'translate3d(0,0px,0)'}}

config={{delay: 500, duration:1000}}
>
    {props => (
    <div style={props}>

                        <div>
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
                        </div>

</div>
        )}
    </Spring>
    
           
        )
    }
}






