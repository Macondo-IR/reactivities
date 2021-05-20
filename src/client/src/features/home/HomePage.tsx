import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
 
          <Fragment>
 
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to activities!
            </Button>
          </Fragment>
 
          <Fragment>
          <Header as='h2' inverted content={`Welcome to Reactivitities`} />
          
        </Fragment>
        <Fragment>
          <Header as='h1' inverted content={`Welcome to Reactivitities`} />
          <Button as={Link} to='/activities' size='huge' inverted>
              Go to activities!
            </Button>
        </Fragment>
 
      </Container>
    </Segment>
  );
};

export default HomePage;
