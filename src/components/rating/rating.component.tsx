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
  formValid: boolean;
  firstNameErrorDisplay: string;
}

class RatingDialog extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      firstName: '',
      firstNameValid: false,
      formValid: false,
      firstNameErrorDisplay: 'none',
    };

    this.handleFirstName = this.handleFirstName.bind(this);
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

  private formValidation(): void {
    this.setState((prevState: IState) => {
      const { firstNameValid } = prevState;

      if (firstNameValid) {
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

  render() {
    const { isVisible, toggle } = this.props;
    const { firstName, firstNameErrorDisplay } = this.state;

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
        </form>
      </Dialog>
    )
  }
}

export default RatingDialog;
