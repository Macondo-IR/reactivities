import  { useState, useEffect, Fragment } from 'react';
// import {  Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import ActivityForm from '../../features/activities/form/ActivityForm';

// export default App


const App =() => {
  const {activityStore} =useStore();

  const[activities,setActivities]=useState<Activity[]>([]);

  const [submiting, setSubmiting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
    },[activityStore]);

  function handleDeleteActivity(id:string){
    setSubmiting(true);
    // agent.Activities.delete(id).then(()=>{});
    setActivities([...activities.filter(x=>x.id!==id)]);
    setSubmiting(false);
  }


    
    if (activityStore.loadingInitial) return <LoadingComponents content='Loading App' />
    
  return (
     
    <Fragment>
      <NavBar   /> 
      <ActivityDashboard
      activities={activityStore.activities}
      deleteActivity={handleDeleteActivity}
      /> 
      {/* <ActivityForm/> */}
    </Fragment>
  );
};

export default observer(App);
  // <Switch>
// <Route exact path='/' component={HomePage} />
// <Route exact path='/activities' component={ActivityDashboard} />
// <Route path='/activities/:id' component={ActivityDetails} />
// <Route path='/createActivity' component={ActivityForm} />
// <Route component={NotFound} />
// </Switch>