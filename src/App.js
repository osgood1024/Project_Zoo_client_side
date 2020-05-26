import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { Home } from './Home';
import { Favorite } from './Favorite';
import { SubmitProject } from './SubmitProject' ;
import { LogIn } from './components/LogIn' ;
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import styled from 'styled-components'
import{Animation} from './components/Animation'


const Styles =styled.div `

.animation{
  margin-top: 50px;
}

`






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
        <Styles>
        <NavigationBar handleSearch={this.handleSearch} search={this.state.searchTerm} />

        <div className={"animation"}>

           <Animation />
        </div>

        <Layout>
     
            <Switch >
              <Route exact path="/" render={props => <Home {...props} search={this.state.searchTerm} />} 
              />
              <Route path="/favorite" render={props => <Favorite {...props}search={this.state.searchTerm}/>} 
              />
              <Route path="/submitproject" component={SubmitProject}/>
              
              <Route path="/login" component={LogIn}/>
            </Switch>

      
        </Layout>
       
        
        </Styles>
      </React.Fragment>
      
    )}

}










export default withRouter(App)



