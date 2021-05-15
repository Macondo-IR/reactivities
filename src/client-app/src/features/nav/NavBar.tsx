// import { observer } from 'mobx-react-lite';
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';
import { useStore } from '../../app/stores/store';
// import { NavLink } from 'react-router-dom';



export default function  NavBar() {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
            Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
            {/* <Button as={NavLink} to='/createActivity' content='Create Activity' /> */}

        </Menu.Item>
      </Container>
    </Menu>
  );
}
