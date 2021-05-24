import { useState,  useEffect } from 'react';
import { Segment, Button,FormField,Label, Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from 'react-router';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Link } from 'react-router-dom';
import { Formik,Form,Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';
import { date } from 'yup/lib/locale';
import { v4 as uuidv4 } from 'uuid';


export default observer(function ActivityForm(){
  const history=useHistory();
  const {activityStore} =useStore();
  const {loading,loadActivity,loadingInitial,createActivity,updateActivity}=activityStore;
 const {id}=useParams<{id:string}>();

 function handleFormSubmit(activity:Activity){
   if(activity.id.length===0){
     let newActivity={...activity,id:uuidv4()};
    createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`))
   }else{
     updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
   }
 }

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: 'tets',
    category: '',
    description: '',
    date:null,
    city: '',
    venue: '' 
  }); 
  const validationSchema=Yup.object({
    title:Yup.string().required('the activity title is required'),
    description:Yup.string().required('the activity description is required'),
    city:Yup.string().required('the activity city is required'),
    date:Yup.string().required('the activity date is required'),
  })

  useEffect(() => {
    if(id) loadActivity(id).then(activity=>setActivity(activity!))
    },[id,loadActivity]);

  if(loadingInitial) return <LoadingComponents content='Loading' />
  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal'/>
      <Formik enableReinitialize initialValues={activity} validationSchema={validationSchema}
       onSubmit={values=>handleFormSubmit(values)}>
        {({handleSubmit,isValid,isSubmitting,dirty})=>(
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput placeholder='Title' name='title'/>
            <MyTextArea rows={3} placeholder='Description'  name='description'  />
            <MySelectInput  options={categoryOptions} placeholder='Category'  name='category'  />
            <MyDateInput  showTimeSelect dateFormat='MMMMM d, yyyy h:mm aa' placeholderText='Date'  name='date'  timeCaption='time' />
            <Header content='Location Details' sub color='teal'/>

            <MyTextInput  placeholder='City'  name='city'  />
            <MyTextInput  placeholder='Venue'  name='venue'  />
            <Button disabled={isSubmitting ||!dirty ||!isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button  as={Link} to='/activities'   floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>
   
    </Segment>
  );
})

