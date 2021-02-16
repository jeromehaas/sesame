/* eslint-disable max-len */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from '../../components/partials/layouts/DashboardLayout';
import CardWrapper from '../../components/partials/cards/cardWrapper';
import AdminCard from '../../components/partials/cards/AdminCard';
import { showDialog } from '../../redux/actions/dialogstatus-actions';
import TemplateInput from '../../components/partials/inputFields/TemplateInput';
import TemplateForm from '../../components/partials/inputFields/TemplateForm';
import Dialog from '../../components/partials/dialogs/Dialog';
import { activateBlur, deactivateBlur } from '../../redux/actions/dialogblur-actions';

interface Props { }

const Settings: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const dialogStatus = useSelector((state) => state.dialogStatusReducer);

  const cancelDialog = (event) => {
    event.preventDefault();
    dispatch(showDialog('RESET'));
    dispatch(deactivateBlur());
  };

  const showUpdateAdminDialog = (event, user) => {
    dispatch(activateBlur());
    dispatch(showDialog('SETTINGS_DIALOG_UPDATE'));
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('');

  const handleFirstName = (event) => { setFirstName(event.target.value); };
  const handleLasttName = (event) => { setLastName(event.target.value); };
  const handleEmail = (event) => { setEmail(event.target.value); };
  const handlePassword = (event) => { setPassword(event.target.value); };
  const handleTheme = (event) => { setTheme(event.target.value); };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    adminData.firstName = firstName;
    adminData.lastName = lastName;
    adminData.email = email;
    adminData.password = password;
    adminData.theme = theme;
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    cancelDialog(event);
  };

  const adminData = {
    firstName: 'Valia',
    lastName: 'Ampatzi',
    email: 'valia.ampatzi@gmail.com',
    password: '1234Password',
    theme: 'light',
  };

  return (
    <>
      <Dialog active={dialogStatus.settings_update === 'active'}>
        <TemplateForm buttonText="Update Admin" onSubmitAction={(event) => handleUpdateSubmit(event)}>
          <TemplateInput labelText="FirstName" type="text" onChangeAction={handleFirstName} value={firstName} placeholder={adminData.firstName} />
          <TemplateInput labelText="Lastname" type="text" onChangeAction={handleLasttName} value={lastName} placeholder={adminData.lastName} />
          <TemplateInput labelText="Email" type="text" onChangeAction={handleEmail} value={email} placeholder={adminData.email} />
          <TemplateInput labelText="Password" type="password" onChangeAction={handlePassword} value={password} />
          <TemplateInput labelText="Theme" type="radio" onChangeAction={handleTheme} radioOptions={['light', 'dark']} value={theme} placeholder={adminData.theme} />
        </TemplateForm>
      </Dialog>
      <DashboardLayout>
        <CardWrapper>
          <AdminCard admin={adminData} key={adminData.email} options={{ update: showUpdateAdminDialog }} />
        </CardWrapper>
      </DashboardLayout>
    </>
  );
};

export default Settings;
