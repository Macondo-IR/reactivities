import { Grid } from 'semantic-ui-react';
import UserContactList from './UserContactList';

// import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import UserContactFilters from './UserContactFilters';


export default observer(function UserContactDashboard()
  {
     const {userContactStore}=useStore();
     const {loadUserContacts,userContactRegistry}=userContactStore;

     useEffect(() => {
     if(userContactRegistry.size===0)  loadUserContacts();
      }, [userContactRegistry.size,loadUserContacts]) 
    return (
      <Grid>

        <Grid.Column width={10}>
        </Grid.Column> 
        <Grid.Column width={10}>
          <UserContactList />
        </Grid.Column>

        <Grid.Column width={6}>
          <UserContactFilters/>
        </Grid.Column>
      </Grid>
    )
  })
