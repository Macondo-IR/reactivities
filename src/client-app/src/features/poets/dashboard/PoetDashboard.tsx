import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IPoet } from '../../../app/models/poet';
import PoetDetails from '../details/PoetDetails';
import PoetList from './PoetList';
  
interface IProps {
  poets: IPoet[];
  selectPoet: (id: string) => void;
  selectedPoet: IPoet | null;
  setSelectedPoet: (poet: IPoet | null) => void;
}

const PoetDashboard: React.FC<IProps> = ({
  poets,
  selectPoet,
  selectedPoet,
  setSelectedPoet
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PoetList
          poets={poets}
          selectPoet={selectPoet}
         />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedPoet&&(
        <PoetDetails
        poet={selectedPoet}
        setSelectedPoet={setSelectedPoet}
        />
        )}
     
       </Grid.Column>
    </Grid>
  );
};

export default PoetDashboard;
