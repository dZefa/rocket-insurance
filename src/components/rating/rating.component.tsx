import * as React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

import './rating.component.css';

interface IRatingForm {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

interface IErrorMessage {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
}

interface IProps {
  isVisible: boolean;
  toggle: () => void;
}

interface IState {
  form: IRatingForm;
  error: IErrorMessage;
  valid: boolean;
}

class RatingDialog extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      form: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      },
      error: {
        firstName: '',
        lastName: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
      },
      valid: false,
    };

    this.handleStringInput = this.handleStringInput.bind(this);
  }

  private formValidation(errors: IErrorMessage): void {
    let valid = true;

    Object.values(errors).forEach((val: string) => {
      if (valid) {
        val.length > 0 && (valid = false);
      }
    });

    this.setState({ valid });
  }

  public handleStringInput(e: React.FormEvent<HTMLInputElement>): void {
    e.preventDefault();

    const error = {...this.state.error};
    const { value, name } = e.currentTarget;

    switch (name) {
      case 'firstName': {
        error.firstName =
          value.length > 0
            ? ''
            : 'First Name is required';
        
        break;
      }

      case 'lastName': {
        error.lastName =
          value.length > 0
            ? ''
            : 'Last Name is required';
      }
      
      default: {
        break;
      }
    } 
    
    this.setState({ error, form: { [name]: value } } as Pick<IState, any>);

    this.formValidation(error);
  }

  render() {
    const { isVisible, toggle } = this.props;
    const { form, error } = this.state;

    return (
      <Dialog id="rating-dialog" header="Get a Quote" visible={isVisible} focusOnShow={false} modal={true} onHide={toggle}>
        <form>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="First Name" name="firstName" value={form.firstName || ''} onChange={this.handleStringInput} />
            {
              error.firstName.length > 0 &&
              <Message severity="error" text={error.firstName}></Message>
            }
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="Last Name" name="lastName" value={form.lastName || ''} onChange={this.handleStringInput} />
            {
              error.lastName.length > 0 &&
              <Message severity="error" text={error.lastName}></Message>
            }
          </div>
        </form>
      </Dialog>
    )
  }
}

export default RatingDialog;
