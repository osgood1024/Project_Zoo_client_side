import React,{Component} from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import { Home } from './Home';
import { Favorite } from './Favorite';
import { SubmitProject } from './SubmitProject' ;
import { LogIn } from './components/LogIn' ;
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';




class App extends Component{

  
  state={
    projects:[],
    comments:[]

  }

  componentDidMount(){
    fetch('http://localhost:3000/projects')
    .then(resp => resp.json())
    .then(data => this.setState({
        projects: data
      })
    )


    fetch('http://localhost:3000/comments')
    .then(resp=>resp.json())
    .then(commented => this.setState({
        comments: commented
    }))
  
  }

  addLike=(newProject)=>{
  
    let current_project= this.state.projects.reduce((acc,currVal) =>{ 
      if(currVal.id === newProject.id) {
         return acc.concat([newProject])
      } else{
        return acc.concat([currVal])
      }
    }, [])
    
    this.setState({
      projects: current_project
    })
  }
  





  render(){
    console.log(this.state.projects.forEach(console.log))
    return(
      <React.Fragment>
        <NavigationBar/>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" render={props=><Home {...props} projects={this.state.projects} comments={this.state.comments} addlikes={this.addLike} /> }/>
              <Route path="/favorite" component={Favorite}/>
              <Route path="/submitproject" component={SubmitProject}/>
              <Route path="/login" component={LogIn}/>
            </Switch>
          </Router>
        </Layout>
        
      </React.Fragment>
     
    )
  }

}

export default App;
