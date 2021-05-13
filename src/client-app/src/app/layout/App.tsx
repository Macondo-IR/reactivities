import React, { useState, useEffect, Fragment } from 'react';
import { Button, Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import { IPoet } from '../models/poet';
import PoetDashboard from '../../features/poets/dashboard/PoetDashboard';
import agent from '../../app/api/agent';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

const App = () => {
const {activityStore} =useStore();
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
        <h3>{activityStore.title}</h3>
        <Button content="Add ! to title" onClick={activityStore.setTitle}/>
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

export default observer(App);
