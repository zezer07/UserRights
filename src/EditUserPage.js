
  import {MoviesContext} from './context'
  import {useState,useEffect} from 'react'
  import firebase from './firebaseApp'
  import React from 'react'
  
  

function EditUserPageComp(props) {


  const [user,setUser] = useState({})
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [userName,setUserName] = useState("")
  const [sessionTimeout,setSessionTimeOut] = useState("")
  const [createdData,setCreatedData] = useState("")
  const [permissions,setPermissions] = useState([])
  


  useEffect(()=>
  
  {
    
    firebase.firestore().collection("Users").doc(props.match.params.userId).get()
    .then(per=>{


      let obj = { 
        
        FirstName : per.data().FirstName, 
        LastName:per.data().LastName, 
        UserName : per.data().UserName,
        CreatedDate: per.data().CreatedDate ,
        SessionTimeout: per.data().SessionTimeout,
        Permissions: per.data().Permissions
      }


      setUser(obj)
      setFirstName(obj.FirstName)
      setLastName(obj.LastName)
      setUserName(obj.UserName)
      setCreatedData(obj.CreatedDate)
      setSessionTimeOut(obj.SessionTimeout)
      setPermissions(obj.Permissions)
      
     if(obj.Permissions!=null) 

     {
      if(obj.Permissions.includes("ViewSubscriptions"))

      {document.getElementById("ViewSubscriptions").checked=true}

      if(obj.Permissions.includes("CreateSubscriptions"))

      {document.getElementById("CreateSubscriptions").checked=true}

      if(obj.Permissions.includes("DeleteSubscriptions"))

      {document.getElementById("DeleteSubscriptions").checked=true}

      if(obj.Permissions.includes("UpdateSubscriptions"))

      {document.getElementById("UpdateSubscriptions").checked=true}
      
      if(obj.Permissions.includes("ViewMovies"))

      {document.getElementById("ViewMovies").checked=true}
      
      if(obj.Permissions.includes("CreateMovies"))

      {document.getElementById("CreateMovies").checked=true}
     
      if(obj.Permissions.includes("DeleteMovies"))

      {document.getElementById("DeleteMovies").checked=true}

      if(obj.Permissions.includes("UpdateMovies"))

      {document.getElementById("UpdateMovies").checked=true}

     }

    })
    
  }
  
  ,[props.match.params.userId])

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

 const update=(e)=>

 {


  if(props.match.params.userId!="UWhGjXj0ucKDYqPuy5R3")

  {

  e.preventDefault();

   let obj = {FirstName : firstName, LastName : lastName, UserName: userName, CreatedDate : createdData,
              SessionTimeout : sessionTimeout, Permissions : permissions }

  firebase.firestore().collection("Users").doc(props.match.params.userId)
  .set(obj).then (data=>{
    
    alert("Updated")

    firebase.firestore().collection("UsersLogin").get().then(per=>
        
      {

        per.forEach(element => {

          if(element.data()._Id===props.match.params.userId)
          {
            firebase.firestore().collection("UsersLogin").doc(element.id)
            .set({UserName: userName, _Id: props.match.params.userId, Password:element.data().Password}).then(data=>{ 
                 })
  
          }
          
        })

      })

      props.history.push("/UsersManagement/" + props.match.params.userId)

      })

  }

  else alert ("You can't update the details of the administrator ")

}


  return (
   
    <div className="Design">
      

      <h2> {user.FirstName} &nbsp; {user.LastName}</h2>

      <form onSubmit={update}>

        First Name : <input type = "text" id = "FirstName" defaultValue ={user.FirstName} onChange={e=>{setFirstName(e.target.value)}}/> <br/>
        Last Name: <input type = "text" id = "LastName" defaultValue ={user.LastName} onChange={e=>{setLastName(e.target.value)}}/> <br/>
        User Name: <input type = "text" id = "UserName" defaultValue ={user.UserName} onChange={e=>{setUserName(e.target.value)}}/> <br/> 
        Sesion time out (Minutes): <input type = "text" id = "SessionTimeout" defaultValue ={user.SessionTimeout} onChange={e=>{setSessionTimeOut(e.target.value)}}/> <br/>
        Created date : <input type = "text" id = "CreatedDate" defaultValue ={user.CreatedDate} onChange={e=>{setCreatedData(e.target.value)}}/> <br/>
        Permissions : <br/>  
        
        <input type="checkbox" id={"ViewSubscriptions"} onChange={e=>{updatePermissions("ViewSubscriptions")}} /> View Subscriptions <br/>
        <input type="checkbox" id={"CreateSubscriptions"} onChange={e=>{updatePermissions("CreateSubscriptions")}}/> Create Subscriptions <br/>
        <input type="checkbox" id={"DeleteSubscriptions"} onChange={e=>{updatePermissions("DeleteSubscriptions")}}/> Delete Subscriptions <br/>
        <input type="checkbox" id={"UpdateSubscriptions"} onChange={e=>{updatePermissions("UpdateSubscriptions")}}/> Update Subscriptions <br/>
        <input type="checkbox" id={"ViewMovies"} onChange={e=>{updatePermissions("ViewMovies")}}/> View Movies<br/>
        <input type="checkbox" id={"CreateMovies"} onChange={e=>{updatePermissions("CreateMovies")}}/> Create Movies <br/>
        <input type="checkbox" id={"DeleteMovies"} onChange={e=>{updatePermissions("DeleteMovies")}}/> Delete Movies <br/>
        <input type="checkbox" id={"UpdateMovies"} onChange={e=>{updatePermissions("UpdateMovies")}}/> Update Movies <br/> <br/>

        <input type="submit" value="Update" />
        <input type="submit" value="Cancel" onClick={e=>{props.history.push("/UsersManagement/" + props.match.params.userId)}}/>

      </form>
      
    </div>

    
  );
}

export default EditUserPageComp;
