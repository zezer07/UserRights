
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import React from 'react'





function UserComp(props) {

  
  const deleteUser=()=>
  {
    debugger;
  
    if(props.user.id!="UWhGjXj0ucKDYqPuy5R3")

    {
    
      firebase.firestore().collection("Users").doc(props.user.id).delete()
      .then(data=>{ 


      alert("Deleted User")}
      
      )

      
    firebase.firestore().collection("UsersLogin").get().then(per=>
        
      {

        per.forEach(element => {

          if(element.data()._Id===props.user.id)
          {
            

            firebase.firestore().collection("UsersLogin").doc(element.id).delete().then(data=>{ 
             
            window.location.reload("false")
            })
  
          }
          
        })

      })

  }

  else alert("You can't delete the administrator")


 
  }

  

  
  return (

 

    <div className="Design">
      
      <b> Name </b>  : {props.user.FirstName} &nbsp; {props.user.LastName} <br/> <br/>

      <b>User Name </b> : {props.user.UserName} <br/> <br/>

          <b>Session timeout </b> : {props.user.SessionTimeout} <br/> <br/>

          <b>Created date </b>: {props.user.CreatedDate} <br/> <br/> <br/>

          <b>permissions </b> : {props.user.permissions.length} <br/> <br/>

          
          <ul>

           {props.user.permissions.map(perm=>{return <li>{perm}</li>})}
           
           </ul>

          

          <Link to = {"/EditUser/"+props.user.id}>Edit/Update user</Link> <br/> <br/>
          <input type = "button" value ="Delete user" onClick={deleteUser}/> <br/> <br/>
      
    </div>

    
  );
}

export default UserComp;
