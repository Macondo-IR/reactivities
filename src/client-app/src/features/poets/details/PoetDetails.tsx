import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IPoet } from '../../../app/models/poet';

interface IProps {
    poet: IPoet;
    setSelectedPoet: (poet: IPoet | null) => void;
}

const PoetDetails: React.FC<IProps> = ({poet, setSelectedPoet}) => {
  return (
    <Card fluid>
      <Image src={`/assets/poet/${poet.url}.gif`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{poet.name}</Card.Header>
        <Card.Meta>
          <span>{poet.url}</span>
        </Card.Meta>
        <Card.Description>
          {poet.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
             <Button onClick={() => setSelectedPoet(null)} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default PoetDetails;
