import {useEffect,useState} from 'react'
import firebase from './firebaseApp'
import React from 'react'


function EditMoviePageComp(props) 
{
  const [movie,setMovie] = useState({})
  const [NameMovie,setNameMovie] = useState("")
  const [GenresMovie,setGenresMovie] = useState("")
  const [ImageMovie,setImageMovie] = useState("")
  const [Premired,setPremired] = useState("")

  useEffect(()=>

  {
    firebase.firestore().collection("Movies").doc(props.match.params.movieId).get()
    .then(mov=>{

      let obj = {
                    Name : mov.data().Name,
                    Genres : mov.data().Genres,
                    Image : mov.data().Image,
                    Premired : mov.data().Premiered
                }
              
     setMovie(obj)
     setNameMovie(obj.Name)
     setGenresMovie(obj.Genres.join())
     setImageMovie(obj.Image)
     setPremired(obj.Premired)

    })
  }
 ,[])

 const updateMovie=()=>

 {
   let arrayInput = GenresMovie
   let newArray = arrayInput.split(",")
   let obj ={Name : NameMovie, Genres : newArray, Image : ImageMovie, Premiered: Premired}
   firebase.firestore().collection("Users")
  .doc(props.match.params.userId).get().then(resp=>
  
  {
    let ViewMov = resp.data().Permissions.includes("UpdateMovies")
    if(ViewMov)
    {
      firebase.firestore().collection("Movies").doc(props.match.params.movieId)
      .set(obj).then(resp=>
         {
          
           alert("Movie updated !")
           props.history.push("/Movies/" + props.match.params.userId )
          })

    }
          
        
  else { alert("You can't have an access to this fonction")}
         
    })
  
 }

  return (

    <div className="DesignFilm">

       <h2>{movie.Name}</h2>
       Name : <input type="text" onChange={e=>{setNameMovie(e.target.value)}} defaultValue={movie.Name}/> <br/> <br/>
       Genres : <input type ="text" onChange={e=>{setGenresMovie(e.target.value)}} defaultValue={movie.Genres}/> <br/> <br/>
       Image URL : <input type = "text" onChange={e=>{setImageMovie(e.target.value)}} defaultValue={movie.Image}/> <br/> <br/>
       Premired : <input type = "text" onChange={e=>{setPremired(e.target.value)}} defaultValue={movie.Premired}/> <br/> <br/>
       <input type= "button" value="update" onClick={updateMovie}/> <br/> <br/>
       <input type = "button"  value = "cancel" onClick={e=>{props.history.push("/Movies/" + props.match.params.userId)}}/> <br/> <br/>

    </div>

    
  );
}

export default EditMoviePageComp;
