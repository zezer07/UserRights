
import {useContext} from 'react'
import {MoviesContext} from './context'
import firebase from 'firebase'


function MainPageComp(props) {

  const [userName] = useContext(MoviesContext)
 
 const checkMovies =()=>
 {

  //check the permissions if the user have a view movies permission
 
  firebase.firestore().collection("Users")
  .doc(props.match.params.userId).get().then(resp=>{
   
    let ViewMov = resp.data().Permissions.includes("ViewMovies")

    if(ViewMov)
    {
      props.history.push("/Movies/"+ props.match.params.userId)
    }
  
    else 
    
    {
      alert("You can't have an access to this fonction")
    }
    
  })

 

 }

 const checkAdministrator=()=>
 {
    //some logic to check if it is not the administrator

    if(sessionStorage["userName"]=="Admin")

 {      

    props.history.push("/UsersManagement/" + props.match.params.userId)

 }

 else {alert("You can't have an access to this fonction")}

}

const checkSubs=()=>
{
  firebase.firestore().collection("Users")
  .doc(props.match.params.userId).get().then(resp=>
  
  {
    let ViewMov = resp.data().Permissions.includes("ViewSubscriptions")
    
  
  if(ViewMov)
  {
    props.history.push("/Subscriptions/"+ props.match.params.userId)
  }

  else 
  
  {
    alert("You can't have an access to this fonction")
  }


})

  
}

  return (
    
    

  <div>

    <h2> Welcome {sessionStorage["userName"]} </h2>

    <input type = "button" value ="Movies" onClick={checkMovies}/> 
    <input type = "button" value ="Subscriptions" onClick ={checkSubs}/>
    <input type = "button" value ="Users Management" onClick={checkAdministrator}/>
    <input type = "button" value ="Log Out" onClick ={()=>{props.history.push("/")}}/>

   

    
  </div>
  );
}

export default MainPageComp;
