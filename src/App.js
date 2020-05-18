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
    searchTerm:''
  }

  handleSearch=(e) =>{
    this.setState({
        searchTerm: e.target.value
    })
}


  render(){

    return(
      <React.Fragment>
        <NavigationBar handleSearch={this.handleSearch} search={this.state.searchTerm} />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} search={this.state.searchTerm}/>}/>
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
