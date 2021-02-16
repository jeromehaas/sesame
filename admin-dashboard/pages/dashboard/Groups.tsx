/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from '../../components/partials/layouts/DashboardLayout';
import GroupCard from '../../components/partials/cards/GroupCard';
import CardWrapper from '../../components/partials/cards/cardWrapper';
import { Group } from '../../redux/types';
import SearchBar from '../../components/partials/searchBar/searchBar';
import { activateBlur, deactivateBlur } from '../../redux/actions/dialogblur-actions';
import Dialog from '../../components/partials/dialogs/Dialog';
import TemplateForm from '../../components/partials/inputFields/TemplateForm';
import TemplateInput from '../../components/partials/inputFields/TemplateInput';
import { showDialog } from '../../redux/actions/dialogstatus-actions';
import {
  createGroup, chooseGroup, updateGroup,
} from '../../redux/actions/group-actions';

interface Props { }

const Groups: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();

  const dialogStatus = useSelector((state) => state.dialogStatusReducer);
  const groups = useSelector((store) => store.groupReducer.groups.sort((a, b) => ((a.groupName > b.groupName) ? 1 : -1)));
  const dbDoors = useSelector((store) => store.doorReducer.doors);

  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);
  const [input, setInput] = useState<string>('');

  const filterGroups = (inputName) => {
    const filtered = groups.filter((group) => {
      const name = group.groupName;
      return name.toLowerCase().includes(inputName.toLowerCase());
    });
    setFilteredGroups(filtered);
    setInput(inputName);
  };
  const cancelDialog = (event) => {
    event.preventDefault();
    dispatch(showDialog('RESET'));
    dispatch(deactivateBlur());
  };

  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [accessFromHour, setAccessFromHour] = useState(0);
  const [accessToHour, setAccessToHour] = useState(0);
  const [doors, setDoors] = useState([]);
  const handleGroupName = (event) => {
    setGroupName(event.target.value);
  };
  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);
  const handleDescription = (event) => { setDescription(event.target.value); };
  const handleAccessFromHour = (event) => { setAccessFromHour(event.target.value); };
  const handleAccessToHour = (event) => { setAccessToHour(event.target.value); };
  const handleDoors = (event) => {
    if (doors.includes(event.target.value)) {
      setDoors(doors.filter((door) => door !== Number(event.target.value)));
    } else {
      setDoors([...doors, Number(event.target.value)]);
    }
  };
  const pickedGroup = useSelector((state) => state.choosenCardReducer.picked);
  const showCreateGroupDialog = () => {
    dispatch(activateBlur());
    dispatch(showDialog('GROUPS_DIALOG_CREATE'));
  };
  const showUpdateGroupDialog = (event, group) => {
    dispatch(activateBlur());
    dispatch(showDialog('GROUPS_DIALOG_UPDATE'));
    dispatch(chooseGroup(group));
  };

  const handleCreateSubmit = (event, id) => {
    event.preventDefault();
    dispatch(createGroup({
      groupName,
      description,
      accessFromHour,
      accessToHour,
      doors,
    }));
    setGroupName('');
    setDescription('');
    setAccessFromHour(0);
    setAccessToHour(0);
    setDoors([]);
    setFilteredGroups(groups);
    cancelDialog(event);
  };

  const handleUpdateSubmit = (event, aid) => {
    event.preventDefault();
    const groupObj = {
      groupName: groupName === '' ? pickedGroup.firstName : groupName,
      description: description === '' ? pickedGroup.description : description,
      accessFromHour: accessFromHour === null ? pickedGroup.accessFromHour : accessFromHour,
      accessToHour: accessToHour === null ? pickedGroup.accessToHour : accessToHour,
      doors: doors === [] ? pickedGroup.doors : doors,
    };
    dispatch(updateGroup(pickedGroup.gid, groupObj));
    setGroupName('');
    setDescription('');
    setAccessFromHour(0);
    setAccessToHour(0);
    setDoors([]);
    setFilteredGroups(groups);
    cancelDialog(event);
  };

  return (
    <>
      <Dialog active={dialogStatus.groups_create === 'active'}>
        <TemplateForm buttonText="Create Group" onSubmitAction={(event) => handleCreateSubmit(event, 'its working')}>
          <TemplateInput labelText="Name of Group" type="text" onChangeAction={handleGroupName} value={groupName} />
          <TemplateInput labelText="Description" type="text" onChangeAction={handleDescription} value={description} />
          <TemplateInput
            labelText="Access from"
            type="dropdown"
            onChangeAction={handleAccessFromHour}
            value={accessFromHour}
            dropdownOptions={[{ value: '00:00', id: 0 }, { value: '01:00', id: 1 }, { value: '02:00', id: 2 }, { value: '03:00', id: 3 }, { value: '04:00', id: 4 }, { value: '05:00', id: 5 }, { value: '06:00', id: 6 }, { value: '07:00', id: 7 }, { value: '08:00', id: 8 }, { value: '09:00', id: 9 }, { value: '10:00', id: 10 }, { value: '11:00', id: 11 }, { value: '12:00', id: 12 }, { value: '13:00', id: 13 }, { value: '14:00', id: 14 }, { value: '15:00', id: 15 }, { value: '16:00', id: 16 }, { value: '17:00', id: 17 }, { value: '18:00', id: 18 }, { value: '19:00', id: 19 }, { value: '20:00', id: 20 }, { value: '21:00', id: 21 }, { value: '22:00', id: 22 }, { value: '23:00', id: 23 }, { value: '24:00', id: 24 }]}
          />
          <TemplateInput
            labelText="Access to"
            type="dropdown"
            onChangeAction={handleAccessToHour}
            value={accessToHour}
            dropdownOptions={[{ value: '00:00', id: 0 }, { value: '01:00', id: 1 }, { value: '02:00', id: 2 }, { value: '03:00', id: 3 }, { value: '04:00', id: 4 }, { value: '05:00', id: 5 }, { value: '06:00', id: 6 }, { value: '07:00', id: 7 }, { value: '08:00', id: 8 }, { value: '09:00', id: 9 }, { value: '10:00', id: 10 }, { value: '11:00', id: 11 }, { value: '12:00', id: 12 }, { value: '13:00', id: 13 }, { value: '14:00', id: 14 }, { value: '15:00', id: 15 }, { value: '16:00', id: 16 }, { value: '17:00', id: 17 }, { value: '18:00', id: 18 }, { value: '19:00', id: 19 }, { value: '20:00', id: 20 }, { value: '21:00', id: 21 }, { value: '22:00', id: 22 }, { value: '23:00', id: 23 }, { value: '24:00', id: 24 }]}
          />
          <TemplateInput labelText="Allowed doors" type="checkbox" onChangeAction={handleDoors} value={doors} checkBoxOptions={dbDoors} />
        </TemplateForm>
      </Dialog>
      <Dialog active={dialogStatus.groups_update === 'active'}>
        <TemplateForm buttonText="Update Group" onSubmitAction={(event) => handleUpdateSubmit(event, 'its working')}>
          <TemplateInput labelText="Name of Group" type="text" onChangeAction={handleGroupName} value={groupName} placeholder={pickedGroup.groupName} />
          <TemplateInput labelText="Description" type="text" onChangeAction={handleDescription} value={description} placeholder={pickedGroup.description} />
          <TemplateInput
            labelText="Access from"
            type="dropdown"
            value={accessFromHour}
            onChangeAction={handleAccessFromHour}
            dropdownOptions={[{ value: '00:00', id: 0 }, { value: '01:00', id: 1 }, { value: '02:00', id: 2 }, { value: '03:00', id: 3 }, { value: '04:00', id: 4 }, { value: '05:00', id: 5 }, { value: '06:00', id: 6 }, { value: '07:00', id: 7 }, { value: '08:00', id: 8 }, { value: '09:00', id: 9 }, { value: '10:00', id: 10 }, { value: '11:00', id: 11 }, { value: '12:00', id: 12 }, { value: '13:00', id: 13 }, { value: '14:00', id: 14 }, { value: '15:00', id: 15 }, { value: '16:00', id: 16 }, { value: '17:00', id: 17 }, { value: '18:00', id: 18 }, { value: '19:00', id: 19 }, { value: '20:00', id: 20 }, { value: '21:00', id: 21 }, { value: '22:00', id: 22 }, { value: '23:00', id: 23 }, { value: '24:00', id: 24 }]}
          />
          <TemplateInput value={accessToHour} labelText="Access to" type="dropdown" onChangeAction={handleAccessToHour} dropdownOptions={[{ value: '00:00', id: 0 }, { value: '01:00', id: 1 }, { value: '02:00', id: 2 }, { value: '03:00', id: 3 }, { value: '04:00', id: 4 }, { value: '05:00', id: 5 }, { value: '06:00', id: 6 }, { value: '07:00', id: 7 }, { value: '08:00', id: 8 }, { value: '09:00', id: 9 }, { value: '10:00', id: 10 }, { value: '11:00', id: 11 }, { value: '12:00', id: 12 }, { value: '13:00', id: 13 }, { value: '14:00', id: 14 }, { value: '15:00', id: 15 }, { value: '16:00', id: 16 }, { value: '17:00', id: 17 }, { value: '18:00', id: 18 }, { value: '19:00', id: 19 }, { value: '20:00', id: 20 }, { value: '21:00', id: 21 }, { value: '22:00', id: 22 }, { value: '23:00', id: 23 }, { value: '24:00', id: 24 }]} />
          <TemplateInput labelText="Allowed doors" type="checkbox" onChangeAction={handleDoors} value={doors} checkBoxOptions={dbDoors} />

        </TemplateForm>
      </Dialog>
      <DashboardLayout>
        <SearchBar updateInput={filterGroups} input={input} addButtonAction={showCreateGroupDialog} />
        <CardWrapper>
          {filteredGroups.map((group) => <GroupCard group={group} groupName={group.groupName} options={{ update: showUpdateGroupDialog }} />)}
        </CardWrapper>
      </DashboardLayout>
    </>
  );
};

export default Groups;
