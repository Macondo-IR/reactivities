import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image,Icon} from 'semantic-ui-react'
import {UserContact} from "../../../app/models/userContact";
import {format} from 'date-fns';


const userContactImageStyle = {
    filter: 'brightness(30%)'
};

const userContactImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    userContact: UserContact
}

export default observer (function UserContactDetailedHeader({userContact}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {/* <Image src={`/assets/categoryImages/${userContact.category}.jpg`} fluid style={userContactImageStyle}/> */}
                <Segment style={userContactImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={userContact.personelName}
                                    style={{color: 'white'}}
                                />
                                <p>{ userContact.post}</p>
                                <Icon name='user plus'/> 

                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join UserContact</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${userContact.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})
