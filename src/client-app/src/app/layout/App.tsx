import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import { IPoet } from '../models/poet';
import PoetDashboard from '../../features/poets/dashboard/PoetDashboard';
import agent from '../../app/api/agent';
import LoadingComponents from './LoadingComponents';

const App = () => {
  const [poets, setPoets] = useState<IPoet[]>([]);
const[loading,setLoading]=useState<boolean>(true);

  const [selectedPoet, setSelectedPoet] = useState<IPoet | null>(
    null
  );
 
  const handleSelectPoet = (id: string) => {
    setSelectedPoet(poets.filter(a => a.id === id)[0]);
  };
  const handleOpenCreateForm = () => {
    setSelectedPoet(null);
   };


  useEffect(() => {
    agent.Poets.list().then(response=>{
      setPoets(response);
      setLoading(false);

    });
    },[]);

    if (loading) return <LoadingComponents content='Loading App' />
    
  return (
     
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        {/* <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        /> */}
          <PoetDashboard
          poets={poets}
          selectPoet={handleSelectPoet}
          selectedPoet={selectedPoet}
          setSelectedPoet={setSelectedPoet}
        />

      </Container>
    </Fragment>
  );
};

export default App;
