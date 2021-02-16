import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from '../../components/partials/layouts/DashboardLayout';
import DoorCard from '../../components/partials/cards/DoorCard';
import CardWrapper from '../../components/partials/cards/cardWrapper';
import { Door } from '../../redux/types';
import SearchBar from '../../components/partials/searchBar/searchBar';
import Dialog from '../../components/partials/dialogs/Dialog';
import TemplateForm from '../../components/partials/inputFields/TemplateForm';
import TemplateInput from '../../components/partials/inputFields/TemplateInput';
import { showDialog } from '../../redux/actions/dialogstatus-actions';
import { activateBlur } from '../../redux/actions/dialogblur-actions';

interface Props { }

const Doors: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const [door, setDoor] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const dialogStatus = useSelector((state) => state.dialogStatusReducer);

  const doors = useSelector((state) => state.doorReducer.doors);

  const [filteredDoors, setFilteredDoors] = useState<Door[]>(doors);
  const [input, setInput] = useState<string>('');

  const updateDoors = (inputName) => {
    const filtered = doors.filter((door) => {
      const name = door.doorName;
      return name.toLowerCase().includes(inputName.toLowerCase());
    });
    setInput(inputName);
    setFilteredDoors(filtered);
  };
  const handleDoorName = (event) => {
    setDoor(event.target.value);
  };
  const handleDoorEndpoint = (event) => {
    setDoor(event.target.value);
  };
  const addDoor = () => {
    dispatch(activateBlur());
    dispatch(showDialog('DOORS_DIALOG'));
  };

  return (
    <>
      <Dialog active={dialogStatus.doors === 'active'}>
        <TemplateForm buttonText="Add Door" onSubmitAction="addDoor">
          <TemplateInput labelText="Name of Door" type="text" onChangeAction={handleDoorName} value={door} />
          <TemplateInput labelText="Endpoint" type="text" onChangeAction={handleDoorEndpoint} value={endpoint} />
        </TemplateForm>
      </Dialog>
      <DashboardLayout>

        <SearchBar updateInput={updateDoors} input={input} addButtonAction={addDoor} />
        <CardWrapper>
          {filteredDoors.map((pickedDoor) => <DoorCard doorName={pickedDoor.doorName} />)}
        </CardWrapper>
      </DashboardLayout>
    </>
  );
};

export default Doors;
