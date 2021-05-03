import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
function App() {
  const [activities,setActivities]=useState<Activity[]>([]);
   useEffect(() => {
     axios.get<Activity[]>('https://localhost:5001/api/Activities').then(response=>
     {
       console.log(response);
       setActivities(response.data);
     })
   },[])
  return (
    <div >
      <Navbar/>
      <Header as='h2' icon='users' content='Reactivities' />
       <List>
         {activities.map((activity)=>(
           <List.Item key={activity.id}>
             {activity.title} 
           </List.Item>
         ))}
       </List>
        
    </div>
  );
}

export default App;
