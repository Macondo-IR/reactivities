import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

const Navbar =() => {
    return (
        <Menu inverted fixed='top'>
            <Container  style={{marginTop:'7em'}}>
                <Menu.Item header>
                    <img src="/assets/Images/logo.png" alt='logo' style={{marginRight:'10 px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'>
                </Menu.Item>     
                <Menu.Item >
                    <Button positive content="Create Activity"></Button>
                </Menu.Item>                             
            </Container>
            
        </Menu>
    )
}



export default Navbar
