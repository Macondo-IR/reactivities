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
import UserContactList from './UserContactList';

 interface Props{
  searchText:string
}
export default observer(function UserContactSearch(){
  const history=useHistory();
  const {userContactStore} =useStore();
  const {loading,searchUserContacts,loadingInitial,groupedUserContacts}=userContactStore;

 function handleFormSubmit(search:Props){
console.log('fired...');

console.log(search.searchText);
   if(search.searchText.length>2){
//  console.log(search.searchText.length);
searchUserContacts(search.searchText);
console.log(groupedUserContacts);
 
   }
 }

  const [search, setSearch] = useState<Props>({
    searchText: ''
      }); 
  const validationSchema=Yup.object({
    searchText:Yup.string().required('the searchbox must be filled'),
 
  })

  useEffect(() => {
    if(search.searchText) handleFormSubmit(search);
     },[search.searchText,groupedUserContacts]);
    
  if(loadingInitial) return <LoadingComponents content='Loading' />
  return (
    <Segment clearing>
      <Header content='UserContact Details' sub color='teal'/>
      <Formik enableReinitialize initialValues={search} validationSchema={validationSchema}
       onSubmit={ values=>handleFormSubmit(values)}>
        {({handleSubmit,isValid,isSubmitting,dirty})=>(
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput placeholder='SearchText' name='searchText'/>
            <Button floated='right' positive type='submit' content='Submit' />
            <Button  as={Link} to='/userContacts'   floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>
   <UserContactList/>
    </Segment>
  );
})

