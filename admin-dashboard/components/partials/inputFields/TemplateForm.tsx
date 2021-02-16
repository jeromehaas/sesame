import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../styles/TemplateForm.module.scss';
import { showDialog } from '../../../redux/actions/dialogstatus-actions';
import { deactivateBlur } from '../../../redux/actions/dialogblur-actions';

interface Props {
  onSubmitAction: any,
  buttonText: string,
}

const TemplateForm: React.FunctionComponent<Props> = ({
  children,
  onSubmitAction,
  buttonText,
}) => {
  const dispatch = useDispatch('');

  const cancelDialog = (event) => {
    event.preventDefault();
    dispatch(showDialog('RESET'));
    dispatch(deactivateBlur());
  };

  return (
    <form className={styles.form} onSubmit={onSubmitAction}>
      <table>
        <tbody>
          {children}
          <tr>
            <td colSpan={2}>
              <button type="button" className={styles.buttonWhite} onClick={(event) => cancelDialog(event)}>Cancel</button>
              <input className={styles.buttonRed} type="submit" value={buttonText} />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default TemplateForm;
