import {useState,useEffect} from 'react'
import firebase from './firebaseApp'
import './Design.css'
import UserComp from './UserComp'


function UsersManagementComp(props) {

  const [users,setUsers] = useState([])
  
  useEffect(()=>
  {


    debugger
    firebase.firestore().collection("Users").get()
    .then(data=>{

      let persons =[]

      data.forEach(user=>{


        let id = user.id
        let FirstName = user.data().FirstName
        let LastName =user.data().LastName
        let SessionTimeout =user.data().SessionTimeout
        let CreatedDate = user.data().CreatedDate
        let UserName = user.data().UserName
        let permissions = []

        if( user.data().Permissions)
        {
        user.data().Permissions.forEach(x=>{

          permissions.push(x)
        })
        
       }

        let obj ={id,FirstName,LastName,SessionTimeout,CreatedDate,UserName,permissions}

        persons.push(obj)


      })

     setUsers(persons)



    })



  },[])

 const AddUserClick=()=>

  {

  
    props.history.push("/AddUser/" + props.match.params.userId)

  }


  return (

   

    <div >

      <input type = "button" value = "Return to the Main Page" onClick={e=>{props.history.push("/MainPage/" +props.match.params.userId)}}/> <br/> <br/>
      
     <input type ="button" value = "Add user"  onClick={AddUserClick}/> <br/> <br/>

     <h2 className="HeaderCenter">All Users</h2>

     {


       users.map(pers=>
        
        {
         
         return <UserComp user = {pers} key={pers.id}/>

       })


     }

     
      
    </div>

    
  );
}

export default UsersManagementComp;
