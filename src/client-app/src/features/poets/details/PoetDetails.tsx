import React from 'react';
import { Card, Image, Button,Modal, Header } from 'semantic-ui-react';
import { Poet } from '../../../app/models/poet';

interface IProps {
    poet: Poet;
    setSelectedPoet: (poet: Poet | null) => void;
}

const PoetDetails: React.FC<IProps> = ({poet, setSelectedPoet}) => {
  const [open, setOpen] = React.useState(true)

  return (
    <Modal
    onClose={() =>{ setOpen(false);setSelectedPoet(null)}}
    onOpen={() => setOpen(true)}
    open={open}
   >
    <Modal.Header>{poet.name}</Modal.Header>
    <Modal.Content image >
      <Image size='large' src={`/assets/poet/${poet.url}.gif`} wrapped />
      <Modal.Description>
        <Header>{poet.name}</Header>
        <p>
        {poet.description}
        </p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>

      <Button
        content="باشه دیگه "
        labelPosition='right'
        icon='checkmark'
        onClick={() => {setOpen(false);setSelectedPoet(null)}}
        positive
      />
    </Modal.Actions>
  </Modal>

    // <Card fluid>
    //   <Card.Content>
    //     <Card.Header>{poet.name}</Card.Header>
    //     <Card.Meta>
    //       <span>{poet.url}</span>
    //     </Card.Meta>
    //     <Card.Description>
    //       {poet.description}
    //     </Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button.Group widths={2}>
    //          <Button onClick={() => setSelectedPoet(null)} basic color='grey' content='Cancel' />
    //     </Button.Group>
    //   </Card.Content>
    // </Card>
  );
};

export default PoetDetails;
