import React,{Component} from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import { Home } from './Home';
import { Favorite } from './Favorite';
import { SubmitProject } from './SubmitProject' ;
import { LogIn } from './components/LogIn' ;
import { Layout } from './components/Layout';
import {NavigationBar} from './components/NavigationBar';




class App extends Component{
  render(){
    return(
      <React.Fragment>
        <NavigationBar/>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
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
