
import {Link} from 'react-router-dom'
import MoviesWatchedComp from './MoviesWatched'
import firebase from 'firebase'

function MemberComp(props) {


  const deleteMember =()=>
  {
    firebase.firestore().collection("Members").doc(props.member.Id).delete()
    .then(data=>{

      alert(' Member Deleted')
      window.location.reload("false")
    })
  }
  
  return (

    <div className= "DesignSubscriptions">
      
     
      <h2>{props.member.Name}</h2>

      <b> Email </b> :  {props.member.Email} <br/> <br/>
      <b> City : </b> {props.member.City} <br/> <br/>

      <Link to ={"/EditMember/" + props.member.Id + "/" + props.userId }> Edit/Update Member</Link> <br/><br/>

      <input type ="button" value="Delete Member" onClick={deleteMember}/> <br/> <br/>


      <MoviesWatchedComp Id = {props.member.Id} userId ={props.userId}/>

      
    </div>

    
  );
}

export default MemberComp;
