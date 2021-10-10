import {useState,useEffect,useContext} from 'react'
import firebase from './firebaseApp'
import './Design.css'
import MovieComp from './MovieComp'
import axios from 'axios';


function MoviesPageComp(props) {

  const [movies,setMovies] = useState([])
  const [movieFind,setMovieFind] = useState()
  
  useEffect(()=>
  {
    
    async function allUsers (){

    let respMovies = await axios.get("https://api.tvmaze.com/shows")

     //Juste the first time or if there is not movies in the DB, put the movies in the DB from https://api.tvmaze.com/shows 

    firebase.firestore().collection("Movies").get()
    .then(resp=>{
  
      if(resp.size==1)

      {   
          respMovies.data.forEach(x=> {

            let obj ={Name : x.name, Genres : x.genres, Image : x.image.medium, Premiered : x.premiered}

            firebase.firestore().collection("Movies").add(obj).then(data=>{})
            
          });

      }

      let allMovies =[]

      resp.forEach(movie=>{

        let id = movie.id
        let Name = movie.data().Name
        let genres = [] 

        if(movie.data().Genres!=null)
        {
         movie.data().Genres.forEach(element => 
          
          {

          genres.push(element)
          
        });

      }

        let Image = movie.data().Image
        let Premiered = movie.data().Premiered
       
        let obj ={id,Name,genres,Image,Premiered}

        allMovies.push(obj)


      })

     setMovies(allMovies)

    })

   } allUsers()

   if(props.match.params.mov!=undefined)
   {
    let moveDefault = document.getElementById("moveFind").defaultValue = props.match.params.mov
   setMovieFind(moveDefault)}
  },[])

  

 const AddMovieClick=()=>

  {
    firebase.firestore().collection("Users")
    .doc(props.match.params.userId).get().then(resp=>{

    let ViewMov = resp.data().Permissions.includes("CreateMovies")

    if(ViewMov)
    {
      props.history.push("/AddMovie/" + props.match.params.userId )
    }
  
    else 
    
    {
      alert("You can't have an access to this fonction")
    }
     
    })
    

  }


  return (

    <div >

      <input type = "button" value = "Return to the Main Page" onClick={e=>{props.history.push("/MainPage/" + props.match.params.userId)}}/> <br/> <br/>
      
     <input type ="button" value = "Add movie"  onClick={AddMovieClick}/> <br/> <br/>

      Find Movie : <input type="text" id ="moveFind"  onChange={e=>{setMovieFind(e.target.value)}}/> 


     <h2 className="HeaderCenter">All Movies : {movies.length}</h2>

     {


       movies.map(movie=>
        
        {
         
         return <MovieComp film = {movie} find ={movieFind} key={movie.id} userId= {props.match.params.userId} />

       })


     }
 
    </div>

    
  );
}

export default MoviesPageComp;
