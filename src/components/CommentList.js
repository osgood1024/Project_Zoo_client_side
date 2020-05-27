  
import React from "react"
// import {Card} from 'react-bootstrap'




 const CommentList = props =>{
     return(

        <div>

            <h4>
                <strong>

                Response(s):
                </strong>
            </h4>
            <hr/>
            
        <p >
             {props.comments}
        </p>

      </div>
   
     )
 }

 export default CommentList

