import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [activities,setActivities]=useState([]);
   useEffect(() => {
     axios.get('https://localhost:5001/api/Activities').then(response=>
     {
       console.log(response);
       setActivities(response.data);
     })
   },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <ul>
         {activities.map((activity:any)=>(
           <li key={activity.id}>
             {activity.title} 
           </li>
         ))}
       </ul>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;