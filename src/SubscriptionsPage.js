import {useEffect,useState} from 'react'
import axios from 'axios'
import firebase from './firebaseApp'
import MemberComp from './MemberComp'


function SubscriptionsPageComp(props) {

 const [members,setMembers] = useState([])

  useEffect(()=>
  {

    async function allMembers ()
    
    {

    let respMovies = await axios.get("https://jsonplaceholder.typicode.com/users")

     //Juste the first time or if there is not members in the DB, put the members in the DB 

    firebase.firestore().collection("Members").get()
    .then(resp=>
      
      {
  
        if(resp.size==1)

        {   
          respMovies.data.forEach(x=> 
            
            {

            let obj ={Name : x.name, Email : x.email, City : x.address.city}

            firebase.firestore().collection("Members").add(obj).then(data=>{})
            
            });

        }

        let allMembers =[]

        resp.forEach(member=>{

        let Id = member.id
        let Name = member.data().Name
        let Email = member.data().Email
        let City = member.data().City

        let obj ={Id,Name,Email,City}

        allMembers.push(obj)


      })

      setMembers(allMembers)

     
      })

    } 
    
    allMembers() 
  
  },[members])


    
  return (

    <div>

      <h2>Subscriptions</h2>

      <input type = "button" value= "Add Member" onClick={e=>{props.history.push("/AddMember/"+ props.match.params.userId)}}/> <br/> <br/>

      <input type = "button" value = "Return to the Main Page" onClick={e=>{props.history.push("/MainPage/" + props.match.params.userId)}}/> <br/> <br/>

      {


       members.map((user,index)=>
 
         {
  
           return <MemberComp key ={index} member = {user} userId={props.match.params.userId}/>

         })


      }
      
    </div>

    
  );
}

export default SubscriptionsPageComp;
