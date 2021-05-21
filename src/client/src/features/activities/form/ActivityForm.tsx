import { useState, ChangeEvent, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from 'react-router';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import {v4 as uuid } from 'uuid'; 
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

export default observer(function ActivityForm(){
  const history=useHistory();
  const {activityStore} =useStore();
  const {createActivity,updateActivity,loading,loadActivity,loadingInitial}=activityStore;
 const {id}=useParams<{id:string}>();

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '' 
  }); 

  useEffect(() => {
    if(id) loadActivity(id).then(activity=>setActivity(activity!))
    },[id,loadActivity]);

  // function handleSubmit() {
  //   if(activity.id.length===0)
  //   {
  //     let newActivity={
  //       ...activity,
  //       id:uuid()
  //     };
  //     createActivity(newActivity).then(()=>{
  //       history.push(`/activities/${newActivity.id}`)
  //     });

  //   }else{
  //     updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
  //   }
  // }
  // function handleInputChange (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
  // {
  //   const { name, value } = event.target; 
  //   setActivity({ ...activity, [name]: value })
  // }
  if(loadingInitial) return <LoadingComponents content='Loading' />
  return (
    <Segment clearing>
      <Formik initialValues={activity} onSubmit={values=>console.log(values)}>
        {({values,handleChange,handleSubmit})=>(
             <Form onSubmit={handleSubmit} autoComplete='off'>
             <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
             <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
             <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
             <Form.Input type='datetime-local' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
             <Form.Input  placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
             <Form.Input  placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
             <Button  loading={loading} floated='right' positive type='submit' content='Submit' />
             <Button  as={Link} to='/activities'   floated='right' type='button' content='Cancel' />
           </Form>
        )}
      </Formik>
   
    </Segment>
  );
})
