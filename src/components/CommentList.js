  
import React from "react"



 const CommentList = props =>{
     return(

        <div>
       
            <h4>
                Comments:
            </h4>
      
             {props.comments}

      </div>
   
     )
 }

 export default CommentList

