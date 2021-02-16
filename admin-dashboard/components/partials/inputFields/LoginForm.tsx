import React from 'react';
import styles from '../../../styles/LoginForm.module.scss';

interface Props {
  onSubmitAction: any,
  buttonText: string,
 }

const LoginForm: React.FunctionComponent<Props> = ({
  children, onSubmitAction, buttonText,
}) => (
  <form className={styles.form} onSubmit={onSubmitAction}>
    <table>
      <tbody>
        {children}
        <tr>
          <td colSpan={2}>
            <input className={styles.buttonRed} type="submit" value={buttonText} />
          </td>
        </tr>
      </tbody>
    </table>
  </form>
);

export default LoginForm;
