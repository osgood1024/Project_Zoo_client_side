  
import React from "react"
// import {Card} from 'react-bootstrap'




 const CommentList = props =>{
     return(

        <div>
       

            <h4>
                Response(s):
            </h4>
            <hr/>
        
             {props.comments}



      </div>
   
     )
 }

 export default CommentList

