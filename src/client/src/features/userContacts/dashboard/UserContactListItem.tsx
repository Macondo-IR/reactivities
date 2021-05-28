import { Link } from 'react-router-dom';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { UserContact } from '../../../app/models/userContact';
import {format} from 'date-fns';
// import { useStore } from '../../../app/stores/store';

interface Props{
    userContact:UserContact
}

export default function UserContactListItem  ({userContact}:Props)    
{  
    // const {userContactStore}=useStore();
    // const {deleteUserContact,loading}=userContactStore;

    return (
<Segment.Group>
  <Segment>
    <Item.Group>
      <Item>
        <Item.Image size='tiny' circular src='/assets/user.png'>
        </Item.Image>
        <Item.Content>
          <Item.Header as ={Link} to={`/userContacts/${userContact.id}`}>{userContact.personelName}</Item.Header>
          <Item.Description> Hosted by dadas</Item.Description> 
        </Item.Content>

      </Item>
    </Item.Group>
  </Segment>
  <Segment>
    <span>
      <Icon name='user'/> {userContact.phone}
      <Icon name='marker'/> {userContact.firstName}
      <Icon name='phone'/> {userContact.lastName}

 
    </span>
  </Segment>
  <Segment secondary>
      Attendees go here 
  </Segment>
  <Segment clearing> 
    <span>{userContact.post}    </span>
    <Button as ={Link} to={`/userContacts/${userContact.id}`} color='teal' floated='right' content='View'>
      
    </Button>

  </Segment>
</Segment.Group>
   
    )
}
