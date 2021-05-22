import { useState,  useEffect } from 'react';
import { Segment, Button,FormField,Label } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from 'react-router';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Link } from 'react-router-dom';
import { Formik,Form,Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default observer(function ActivityForm(){
  const history=useHistory();
  const {activityStore} =useStore();
  const {loading,loadActivity,loadingInitial}=activityStore;
 const {id}=useParams<{id:string}>();

  const [activity, setActivity] = useState({
    id: '',
    title: 'tets',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '' 
  }); 
  const validationSchema=Yup.object({
    title:Yup.string().required('the activity title is required'),
    description:Yup.string().required('the activity description is required')


  })

  useEffect(() => {
    if(id) loadActivity(id).then(activity=>setActivity(activity!))
    },[id,loadActivity]);

  if(loadingInitial) return <LoadingComponents content='Loading' />
  return (
    <Segment clearing>
      <Formik enableReinitialize initialValues={activity} validationSchema={validationSchema} onSubmit={values=>console.log(values)}>
        {({handleSubmit})=>(
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput placeholder='Title' name='title'/>
            <MyTextInput placeholder='Description'  name='description'  />
            <Field placeholder='Category'  name='category'  />
            <Field type='datetime-local' placeholder='Date'  name='date'  />
            <Field  placeholder='City'  name='city'  />
            <Field  placeholder='Venue'  name='venue'  />
            <Button  loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button  as={Link} to='/activities'   floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>
   
    </Segment>
  );
})
