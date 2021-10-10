import NewMovieComp from './NewMovie'
import {useState} from 'react'
import firebase from './firebaseApp'
import {Link} from 'react-router-dom'


const MoviesWatchedComp=(props) => {

  const [view,setView] = useState(false)
  const[movies,setMovies] = useState([])

 
   const allmovies=()=>
   { 
    let moviesName = []
    firebase.firestore().collection("Subscriptions").get()
      .then(x=>
        
        {

         x.forEach(sub=>
          
          {

            if(sub.data().MemberId==props.Id)

                { 

                 for (let index = 0; index < sub.data().Movies.length; index++) 
                 
                  {
                   
                    let Name = sub.data().Movies[index].movieName
                    let movieName = Name
                    moviesName.push(movieName)
                    console.log(moviesName)
                    setMovies(moviesName)
                    
                  }
                
                } //<Link to ="/createAccount">Create Account</Link> <br/>

           })
        
      })
   }
  
  return (

    <div className="DesignMovieWatched">
    
    <h3>Movies Watched</h3>
    
  <input type ="button" value="Show All Subscriptions" onClick={allmovies}/>  <br/> <br/>
    
    <input type ="button" value="Delete /Subscribe to new movie" onClick={e=>setView(true)}/> <br/> <br/>

    <ul>


    {
      movies.map((item,index)=>{
      return <li> <Link to = {"/Movies/" + props.userId + "/" + item}key = {index}>{item} </Link> </li>
     })
   }

   
  </ul>

    <br/><br/>

    <NewMovieComp show = {view} callback={data=>setView(data)} memberId= {props.Id} userId ={props.userId}/>


     </div>

    
  );
}

export default MoviesWatchedComp;
