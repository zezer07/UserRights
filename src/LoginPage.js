
import './App.css';
import {Link} from 'react-router-dom'
import {MoviesContext} from './context'
import {useState,useContext} from 'react'
import firebase from './firebaseApp'

function LoginPageComp(props) {

  const [userName,setUserName] = useContext(MoviesContext)
  const [userPass,setUserPass] = useState("")
  

  sessionStorage["userName"] = userName

  const checkUser=()=>
  {
    firebase.firestore().collection("UsersLogin").get()
    .then(users=>

    { let resp = false

      users.forEach(user=>
    {
      if(user.data().UserName==userName && user.data().Password==userPass)

    {
      let id = user.data()._Id
      resp = true 
      alert ("Login successfuly")
      props.history.push("/MainPage/" + id)   
    }
    
    })

    if(!resp)
    
     {
       alert("Your username or password is incorrect. If you dont't have an account create on ! ")
     }

    
    })

  }

  return (

    <div>

      <h2>Log in Page </h2>

      User name : <input type ="text" onChange ={e=>{setUserName(e.target.value)}}/><br/> <br/>
      Password : <input type="password"onChange = {e=>{setUserPass(e.target.value)}}/> <br/> <br/>

       <input type= "button" value = "log in " onClick={checkUser}/> <br/> <br/>
        New user ? : <Link to ="/createAccount">Create Account</Link> <br/>

     
    </div>
  );
}

export default LoginPageComp;
