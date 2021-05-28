import { useState,  useEffect } from 'react';
import { Segment, Button, Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useHistory, useParams } from 'react-router';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Link } from 'react-router-dom';
import { Formik,Form,Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { UserContact } from '../../../app/models/userContact';
import { v4 as uuidv4 } from 'uuid';


export default observer(function UserContactForm(){
  const history=useHistory();
  const {userContactStore} =useStore();
  const {loading,loadUserContact,loadingInitial,createUserContact,updateUserContact}=userContactStore;
 const {id}=useParams<{id:string}>();

 function handleFormSubmit(userContact:UserContact){
   if(userContact.id.length===0){
     let newUserContact={...userContact,id:uuidv4()};
    createUserContact(newUserContact).then(()=>history.push(`/userContacts/${newUserContact.id}`))
   }else{
     updateUserContact(userContact).then(()=>history.push(`/userContacts/${userContact.id}`))
   }
 }

  const [userContact, setUserContact] = useState<UserContact>({
    id: '',
    firstName: '',
    lastName: '',
    personelName: '',
    personelcode:'',
    meli: '',
    zoneId:1000,
    post:'',
    phone:''
      }); 
  const validationSchema=Yup.object({
    firstName:Yup.string().required('the userContact FirstName  is required'),
    lastName:Yup.string().required('the userContact LasttName  is required'),
    personelName:Yup.string().required('the userContact Full Name is required'),
    phone:Yup.string().required('the userContact Phone is required'),
  })

  useEffect(() => {
    if(id) loadUserContact(id).then(userContact=>setUserContact(userContact!))
    },[id,loadUserContact]);

  if(loadingInitial) return <LoadingComponents content='Loading' />
  return (
    <Segment clearing>
      <Header content='UserContact Details' sub color='teal'/>
      <Formik enableReinitialize initialValues={userContact} validationSchema={validationSchema}
       onSubmit={values=>handleFormSubmit(values)}>
        {({handleSubmit,isValid,isSubmitting,dirty})=>(
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput placeholder='FirstName' name='firstName'/>
            <MyTextInput placeholder='LastName' name='lasttName'/>
            <MyTextInput placeholder='PersonelName' name='personelName'/>
            <MyTextInput placeholder='Phone' name='phone'/>
            <MyTextInput placeholder='Meli' name='meli'/>
            <MyTextInput placeholder='Post' name='post'/>
            <MyTextInput placeholder='English' name='english'/>
            <MyTextArea rows={2} placeholder='Address'  name='address'  />
            <Button disabled={isSubmitting ||!dirty ||!isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button  as={Link} to='/userContacts'   floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>
   
    </Segment>
  );
})

