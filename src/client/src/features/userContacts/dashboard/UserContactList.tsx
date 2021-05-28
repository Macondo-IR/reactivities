import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import UserContactListItem from './UserContactListItem'

export default observer(function UserContactList()
{
  const {userContactStore}=useStore();
  const {groupedUserContacts}=userContactStore;
 
  return (
    <>{groupedUserContacts.map(([group,userContacts])=>(
      <Fragment key={group}>
        <Header sub color='teal' > {group}</Header>
        
        <Segment clearing>
          <Item.Group divided>
            {userContacts.map( userContact=>(
              <UserContactListItem key={userContact.id} userContact={userContact}/>
            ))}
          </Item.Group>
        </Segment>
      </Fragment>
    ))}
  
    </>
  );
});