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



  render(){
    return(
      <React.Fragment>
        <NavigationBar/>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" render={props=><Home {...props} projects={this.state.projects} comments={this.state.comments} /> }/>
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
