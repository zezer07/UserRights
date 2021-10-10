import {useState} from 'react'
import firebase from './firebaseApp'

function CreateAccountComp(props) {

  const[UserName,setUserName]  = useState("")
  const [UserPassword,setUserPassword] = useState("")

  const checkUserNameAndPassword=()=>
  {
    firebase.firestore().collection("UsersLogin").get()
    .then(users=>

    { let resp = false

      users.forEach(user=>
    {
      if(user.data().Password==null)

    {
      resp = true 
      alert ("Your account has been successfully created") 
      firebase.firestore().collection("UsersLogin").doc(user.id)
      .set ({UserName : user.data().UserName , _Id: user.data()._Id,Password : UserPassword})
      props.history.push("/")
      
    }
    
    })

    if(!resp)
    
     {
       alert("You have not been registered to the system. Please consult the system administrator!")
     }

    
    })

    



  }
  return (

 

    <div className="App">
      

  <h2>Create Account</h2>

  User name : <input type ="text" onChange ={e=>{setUserName(e.target.value)}}/> <br/> <br/>
  Password : <input type = "password" onChange={e=>{setUserPassword(e.target.value)}}/> <br/> <br/>

  <input type ="button" value ="create" onClick={checkUserNameAndPassword}/>
      
    </div>

    
  );
}

export default CreateAccountComp;
