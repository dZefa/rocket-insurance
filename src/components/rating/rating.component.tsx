import * as React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

import './rating.component.css';

interface IProps {
  isVisible: boolean;
  toggle: () => void;
}

interface IState {
  firstName: string;
  firstNameValid: boolean;
  firstNameErrorDisplay: string;
  lastName: string;
  lastNameValid: boolean;
  lastNameErrorDisplay: string;
  formValid: boolean;
}

class RatingDialog extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      firstName: '',
      firstNameValid: false,
      firstNameErrorDisplay: 'none',
      lastName: '',
      lastNameValid: false,
      lastNameErrorDisplay: 'none',
      formValid: false,
    };

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
  }

  private firstNameCheck(): void {
    this.setState((prevState: IState) => {
      const { firstName } = prevState;

      if (firstName.length > 0) {
        return { firstNameValid: true, firstNameErrorDisplay: 'none' };
      }

      return { firstNameValid: false, firstNameErrorDisplay: 'block' };
    });
  }

  private lastNameCheck(): void {
    this.setState((prevState: IState) => {
      const { lastName } = prevState;

      if (lastName.length > 0) {
        return { lastNameValid: true, lastNameErrorDisplay: 'none' };
      }

      return { lastNameValid: false, lastNameErrorDisplay: 'block' };
    });
  }

  private formValidation(): void {
    this.setState((prevState: IState) => {
      const { firstNameValid, lastNameValid } = prevState;

      if (firstNameValid && lastNameValid) {
        return { formValid: true };
      }

      return { formValid: false };
    });
  }

  public handleFirstName(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      firstName: e.currentTarget.value,
    });

    this.firstNameCheck();
    this.formValidation();
  }

  public handleLastName(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      lastName: e.currentTarget.value,
    });

    this.lastNameCheck();
    this.formValidation();
  }

  render() {
    const { isVisible, toggle } = this.props;
    const { firstName, firstNameErrorDisplay, lastName, lastNameErrorDisplay } = this.state;

    return (
      <Dialog id="rating-dialog" header="Get a Quote" visible={isVisible} focusOnShow={false} modal={true} onHide={toggle}>
        <form>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="First Name" value={firstName} onChange={this.handleFirstName} />
            <Message severity="error" text="First Name is required" style={{ display: firstNameErrorDisplay }}></Message>
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="Last Name" value={lastName} onChange={this.handleLastName} />
            <Message severity="error" text="Last Name is required" style={{ display: lastNameErrorDisplay }}></Message>
          </div>
        </form>
      </Dialog>
    )
  }
}

export default RatingDialog;
