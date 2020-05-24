import React from 'react';

import {Route,Switch} from 'react-router-dom' ;
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Home } from './Home';
import { Favorite } from './Favorite';
import { SubmitProject } from './SubmitProject' ;



 export function AppContainer({location}){

return(
    <>
    <TransitionGroup className="transition-group">
        <CSSTransition
          key={location}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >

  
        
            <Switch location={location}>
              <Route exact path="/" render={(props) => <Home 
               search={props.search} 
               favorites={props.favorites}
               users={props.users}
               comments={props.comments}
               projects={props.projects}
               handleFavorite={props.handleFavorite} 
               handleFavoriteDel={props.handleFavoriteDel}
               handleLike={props.handleLike}
               handleComment={props.handleComment}
               handleDelComment={props.handleDelComment}
               />}/>
              <Route path="/favorite" render={props => <Favorite {...props} 
              search={props.searchTerm}
              favorites={props.favorites}
              users={props.users}
              comments={props.comments}
              projects={props.projects}
              handleFavorite={props.handleFavorite} 
              handleFavoriteDel={props.handleFavoriteDel}
              handleLike={props.handleLike}
              handleComment={props.handleComment}
              handleDelComment={props.handleDelComment}
            
              
              />} />
              <Route path="/submitproject" render={ props => <SubmitProject {...props} projects={props.projects} 
              newProject={props.addProject} />}/>
              {/* <Route path="/login" component={LogIn}/> */}
            </Switch>
            </CSSTransition>
      </TransitionGroup>

     
    
    </>
    );


}






