import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { Poet} from '../../../app/models/poet';

interface IProps {
  poets: Poet[];
  selectPoet: (id: string) => void;
}

const PoetList: React.FC<IProps> = ({
  poets,
  selectPoet
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {poets.map(poet => (
          <Item key={poet.id}>
            <Item.Content>
              <Item.Header as='a'>{poet.name}</Item.Header>
              <Item.Meta> </Item.Meta>
              <Item.Description>
                <div>{poet.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectPoet(poet.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Label basic content={poet.id} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default PoetList;
