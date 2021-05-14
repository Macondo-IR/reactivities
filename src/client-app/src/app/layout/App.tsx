import React, { useState, useEffect, Fragment } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';

const App = () => {
const {activityStore} =useStore();
const[activities,setActivities]=useState<Activity[]>([]);
const[selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
const[editMode,SetEditMode]=useState(false);
const[loading,setLoading]=useState<boolean>(true);
const [submiting, setSubmiting] = useState(false);
  useEffect(() => {
    activityStore.loadActivites()
    },[activityStore]);

    function handleSelectActivity(id:string)
    {
      setSelectedActivity(activities.find(x=>x.id==id));
    }
    function handleCancelSelectActivity(){
      setSelectedActivity(undefined);
    }
    function handleFormOpen(id?:string){
      id?handleSelectActivity(id):handleCancelSelectActivity();
      SetEditMode(true);
    }
    function handleFormClose(){
      SetEditMode(false);
    }



    
    if (activityStore.loadingInitial) return <LoadingComponents content='Loading App' />
    
  return (
     
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>

        <ActivityDashboard
          activities={activityStore.activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        /> 
          {/* <PoetDashboard
          poets={poets}
          selectPoet={handleSelectPoet}
          selectedPoet={selectedPoet}
          setSelectedPoet={setSelectedPoet}
        /> */}

      </Container>
    </Fragment>
  );
};

export default observer(App);
