import  { useEffect, Fragment } from 'react';
// import {  Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


// export default App
export default observer(function App()
{
  const {activityStore} =useStore();

  useEffect(() => {
    activityStore.loadActivities();
    },[activityStore]);


const location=useLocation();
    
    if (activityStore.loadingInitial) return <LoadingComponents content='Loading App' />
    
  return (
     
  <>
      <Route  exact path='/' component={HomePage}/>
      <Route 
      path={'/(.+)'}
      render={()=>(
        <>
          <NavBar   /> 
          <Container style={{marginTop:'7em'}}>   
            <Route exact path='/activities' component={ActivityDashboard}/>
            <Route path='/activities/:id' component={ActivityDetails}/>
            <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
        </Container>
      </>
      )}
      />
  </>
  
  );

})