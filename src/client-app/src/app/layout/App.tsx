import  { useEffect, Fragment } from 'react';
// import {  Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


// export default App


const App =() => {
  const {activityStore} =useStore();

  useEffect(() => {
    activityStore.loadActivities();
    },[activityStore]);



    
    if (activityStore.loadingInitial) return <LoadingComponents content='Loading App' />
    
  return (
     
    <Fragment>
      <NavBar   /> 
      <ActivityDashboard/> 
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