import { useState, ChangeEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
 import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
 

export default observer(function ActivityForm(){
  const {activityStore} =useStore();
  const {selectedActivity,closeForm,createActivity,updateActivity,loading}=activityStore;

  const initialState=selectedActivity??{
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      }

  const [activity, setActivity] = useState(initialState); 

  function handleSubmit() {
    activity.id?updateActivity(activity):createActivity(activity);
  }
  function handleInputChange (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
  {
    const { name, value } = event.target; 
    setActivity({ ...activity, [name]: value })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder='Title'
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='Description'
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder='City'
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name='venue'
          placeholder='Venue'
          value={activity.venue}
        />
        <Button  loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button  onClick={closeForm}  floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
})
