import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import UserContactDetailedChat from './UserContactDetailedChat';
import UserContactDetailedHeader from './UserContactDetailedHeader';
import UserContactDetailedInfo from './UserContactDetailedInfo';
import UserContactDetailedSidebar from './UserContactDetailedSidebar';
 
export default observer(function UserContactDetails(){
  const {userContactStore}=useStore();
  const {selectedUserContact:UserContact,loadUserContact,loadingInitial}=userContactStore;
  const {id}=useParams<{id:string}>();

  useEffect(() => {
    if(id) loadUserContact(id);
    
  }, [id,loadUserContact]);
  if(loadingInitial||!UserContact) return <LoadingComponents/>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <UserContactDetailedHeader userContact={UserContact} />
        <UserContactDetailedInfo userContact={UserContact} />
        <UserContactDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <UserContactDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
});