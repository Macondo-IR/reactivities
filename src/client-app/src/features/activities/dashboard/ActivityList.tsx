import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityList()
{
  const {activityStore}=useStore();
  const {deleteActivity,activitiesByDate,loading}=activityStore;
  // const {target,setTarget}= useState('');
 
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as ={Link} to={`/activities/${activity.id}`}
                   floated='right'
                  content='View'
                  color='blue'
                  loading={loading}
                />
                <Button
                n
                  onClick={() => deleteActivity(activity.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});