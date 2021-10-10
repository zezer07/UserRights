import {useState} from 'react'
import firebase from './firebaseApp'
import React from 'react'


function AddUserPageComp(props) {

  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [userName,setUserName] = useState("")
  const [sessionTimeout,setSessionTimeOut] = useState("")
  const [permissions,setPermissions] = useState([])

  function updatePermissions(perm)
  {

    if(document.getElementById(perm).checked)    
    { 
      
      if (!(permissions.includes(perm)))

      {
        let  newPerms =[...permissions,perm]
        setPermissions(newPerms)

      }
  
    }
  
  
    else if(!(document.getElementById(perm).checked))
    {
  
      if((permissions.includes(perm)))
  
      {
        
        let index = permissions.indexOf(perm)
        let newPerms = [...permissions]
        newPerms.splice(index,1)
        setPermissions(newPerms)
  
      }
  
  
    }


  }

  const AddUser=(e)=>

   {

    e.preventDefault();

    let UserNameExist= false

    firebase.firestore().collection("Users").get().then(data=>{

      data.forEach(user=>
        {
            if(user.data().UserName==userName)
            { 
              UserNameExist = true
            }

        })

    if(UserNameExist)
    
    {alert("UserName already exist. Choose an other User Name")}

    else 
    {

     let objUser = {FirstName : firstName, LastName : lastName, UserName : userName, 
                  SessionTimeout : sessionTimeout , CreatedDate : new Date().toLocaleDateString("en-GB"), 
                  Permissions : permissions}
   
       firebase.firestore().collection("Users").add(objUser)
       .then(data=>{
        
         let userId = data.id
         let objUserLogin = {_Id : userId, UserName : userName}

         firebase.firestore().collection("UsersLogin").add(objUserLogin)
         .then(data=>{})
                
         alert("New User has created with success")
    
        props.history.push("/UsersManagement/" + props.match.params.userId)
        
      })

     }
    
    })
 }



    return (
  
      
  
      <div className="Design">
        
     <h2>Add New User</h2>

     <form onSubmit={AddUser}>

        First Name : <input type = "text" id = "FirstName" onChange={e=>{setFirstName(e.target.value)}}/> <br/>
        Last Name: <input type = "text" id = "LastName" onChange={e=>{setLastName(e.target.value)}}/> <br/>
        User Name : <input type = "text" id = "UserName" onChange={e=>{setUserName(e.target.value)}}/> <br/>
        Sesion time out (Minutes): <input type = "text" id = "SessionTimeout" onChange={e=>{setSessionTimeOut(e.target.value)}}/> <br/>
        Permissions : <br/>  
        
        <input type="checkbox" id={"ViewSubscriptions"} onChange={e=>{updatePermissions("ViewSubscriptions")}}/> View Subscriptions <br/>
        <input type="checkbox" id={"CreateSubscriptions"} onChange={e=>{updatePermissions("CreateSubscriptions")}}/> Create Subscriptions <br/>
        <input type="checkbox" id={"DeleteSubscriptions"} onChange={e=>{updatePermissions("DeleteSubscriptions")}}/> Delete Subscriptions <br/>
        <input type="checkbox" id={"UpdateSubscriptions"} onChange={e=>{updatePermissions("UpdateSubscriptions")}}/> Update Subscriptions <br/>
        <input type="checkbox" id={"ViewMovies"} onChange={e=>{updatePermissions("ViewMovies")}}/> View Movies<br/>
        <input type="checkbox" id={"CreateMovies"} onChange={e=>{updatePermissions("CreateMovies")}}/> Create Movies <br/>
        <input type="checkbox" id={"DeleteMovies"} onChange={e=>{updatePermissions("DeleteMovies")}}/> Delete Movies <br/>
        <input type="checkbox" id={"UpdateMovies"} onChange={e=>{updatePermissions("UpdateMovies")}}/> Update Movies <br/> <br/>

        <input type="submit" value="Save" />
        <input type="submit" value="Cancel" onClick={e=>{props.history.push("/UsersManagement/" + props.match.params.userId)}}/>



      </form>
        
        
      </div>
  
      
    );
  }
  
  export default AddUserPageComp;