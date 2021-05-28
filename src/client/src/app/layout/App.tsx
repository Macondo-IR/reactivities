import  { useEffect, Fragment } from 'react';
// import {  Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import UserContactDashboard from '../../features/userContacts/dashboard/UserContactDashboard';
import UserContactDetails from '../../features/userContacts/details/UserContactDetails';
import UserContactSearch from '../../features/userContacts/dashboard/UserContactSearch';


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
  <ToastContainer position='bottom-right' hideProgressBar />
      <Route  exact path='/' component={HomePage}/>
      <Route 
      path={'/(.+)'}
      render={()=>(
        <>
          <NavBar/> 
          <Container style={{marginTop:'7em'}}> 
          <Switch>
            <Route exact path='/activities' component={ActivityDashboard}/>
            <Route exact path='/search' component={UserContactSearch}/>
            <Route exact path='/userContacts' component={UserContactDashboard}/>
            <Route path='/activities/:id' component={ActivityDetails}/>
            <Route path='/userContacts/:id' component={UserContactDetails}/>
            <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
            <Route path='/errors' component={TestErrors}/>
            <Route path='/server-error' component={ServerError}/>
            <Route  component={NotFound}/>  
          </Switch>  

        </Container>
      </>
      )}
      />
  </>
  
  );

})