import {Link} from 'react-router-dom'
import firebase from './firebaseApp'
import {useState,useEffect} from 'react'


function MovieComp(props) {

  const [show,setShow] = useState(false)
  
  useEffect(()=>
  { 

    // write instead function which compare each letter 
    
    if(props.find==props.film.Name || props.find==""|| props.find==null)
    {  
      setShow(true)     
    }

    else 
    {
      setShow(false)
    }

  },[props.find])

  const deleteMovie=()=>
  { 
    firebase.firestore().collection("Users")
    .doc(props.userId).get().then(resp=>
      
      {

      let ViewMov = resp.data().Permissions.includes("DeleteMovies")

      if(ViewMov)
      {
        firebase.firestore().collection("Movies").doc(props.film.id).delete()
        .then(data=>{ 
  
  
        alert("Movie Deleted")
       
        window.location.reload("false")

        //props.history.push("Movies/" + props.match.params.userId + "/ ")
      
        })
 
        
      }
    
      else 
      
       {
         alert("You can't have an access to this fonction")
       }

     })
      
  }

 // Show the Component just if you don't search film, or if the film that you search is exist

  if(show)
  
  {
    return (
      
           <div className="DesignFilm">
        
           <h2> {props.film.Name} , {props.film.Premiered} </h2> <br/>

            <b>Genres : </b>

           <ul>

           {props.film.genres.map((item,index)=>{return <li key ={index} >{item}</li>})}
           
           </ul>
           
           <img src= {props.film.Image}></img> <br/> <br/>

           <Link to = {"/EditMovie/"+props.film.id +"/" + props.userId}>Edit/Update user</Link> <br/> <br/>
           
           <input type ="button" value="delete" onClick={deleteMovie}/> <br/> <br/>
        
      </div>
      
    );
  }

  else {return<div></div>}

  }
  
  export default MovieComp;