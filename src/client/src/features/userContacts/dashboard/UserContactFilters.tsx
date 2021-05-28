
import { Header, Item, Menu, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import Calendar from 'react-calendar';
export default function UserContactFilters()
{
 
  return (
    <> 
      <Menu vertical size='large' style={{width:'100%'}}>
       
        <Header icon='filter' attached  color='teal' content='filters' />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header/>
      <Calendar/>
    </>
    )
    }
  