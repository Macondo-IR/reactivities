import { Link } from 'react-router-dom';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import {format} from 'date-fns';
// import { useStore } from '../../../app/stores/store';

interface Props{
    activity:Activity
}

export default function ActivityListItem  ({activity}:Props)    
{  
    // const {activityStore}=useStore();
    // const {deleteActivity,loading}=activityStore;

    return (
<Segment.Group>
  <Segment>
    <Item.Group>
      <Item>
        <Item.Image size='tiny' circular src='/assets/user.png'>
        </Item.Image>
        <Item.Content>
          <Item.Header as ={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
          <Item.Description> Hosted by dadas</Item.Description> 
        </Item.Content>

      </Item>
    </Item.Group>
  </Segment>
  <Segment>
    <span>
      <Icon name='clock'/> {format (activity.date!,'dd MMM yyyy h:mm aa')}
      <Icon name='marker'/> {activity.venue}
 
    </span>
  </Segment>
  <Segment secondary>
      Attendees go here 
  </Segment>
  <Segment clearing> 
    <span>{activity.description}    </span>
    <Button as ={Link} to={`/activities/${activity.id}`} color='teal' floated='right' content='View'>
      
    </Button>

  </Segment>
</Segment.Group>
   
    )
}
