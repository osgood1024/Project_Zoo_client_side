  
import React from "react"
// import {Form} from "react-bootstrap";


 const CommentList = props =>{
     return(
        <div className="comment panel panel-default">
        <div className="panel-heading">
            <h4>
                Comments:
            </h4>
        </div>
        <div className="panel-body">
            
          {props.comments}
        
        </div>
      </div>
   
     )
 }

 export default CommentList

