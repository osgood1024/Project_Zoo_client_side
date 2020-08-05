import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { Home } from './Home';
import { Favorite } from './Favorite';
import { SubmitProject } from './SubmitProject' ;
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import styled from 'styled-components'
// import { Animation } from './components/Animation'
// import { LogIn } from './components/LogIn' ;
// import { Toggle } from './components/Toggle'
import { Trails } from './components/Trails'
import { Transition, animated } from 'react-spring/renderprops'

// import { Jumbotron as Jumbo} from "react-bootstrap";


var Spinner = require('react-spinkit');




const Styles =styled.div `

.animation{
  margin: 100px 200px 30px 200px;
  font-size: 25px;
}

.ball{
  margin-top: 50px;
}



`
const Container = styled(animated.div)`
  
  width: 100%;
`


const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => (
      <Transition
        native
        items={location}
        keys={location => location.pathname}
        from={{ opacity: 0, transform: 'perspective(900px) rotateY(180deg)' }}
        enter={{ opacity: 1, transform: 'perspective(900px) rotateY(0deg)' }}
        leave={{ opacity: 0, transform: 'perspective(900px) rotateY(-180deg)', pointerEvents: 'none' }}>
        {location => style => <Container style={style}>{children(location)}</Container>}
      </Transition>
    )}
  />
)



 class App extends Component{

  state={
    searchTerm:'',
    show:true
    
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

        <img src={'./animation.gif'} alt={'animation'} style={{width:320,height:300,float:'right', margin:'0px 550px 0px 0px'}} />
        <div className={"animation"} >
       
        {/* WELCOME TO PROJECT ZOO! */}
        <Trails/>
        <Spinner name="double-bounce"  color="green" style={{margin:"22px 0px 0px 60px"}}/>


          
      </div>

        <Layout>
          <AnimatedRoute>
            {location => (
     
            <Switch location={location} >
              
                  <Route exact path="/" render={props => <Home {...props} search={this.state.searchTerm} />} 
                  />
                  <Route path="/favorite" render={props => <Favorite {...props} search={this.state.searchTerm}   />} 
                  />
                  <Route path="/submitproject" component={SubmitProject}/>
              
             
            </Switch>
            )}
          </AnimatedRoute>

        </Layout>


        {/* <div className={"ball"}>
        <Animation />
        </div> */}
 
        
        </Styles>
      </React.Fragment>
      
    )}

}





export default withRouter(App)



