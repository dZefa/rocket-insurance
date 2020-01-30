import * as React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import './rating.component.css';

interface IAddress {
  line_1: string;
  line_2?: string;
  city: string;
  region: string;
  postal: string;
}

interface ICompletedForm {
  first_name: string;
  last_name: string;
  address: IAddress;
}

interface IRatingForm {
  first_name: string;
  last_name: string;
  line_1: string;
  line_2?: string;
  city: string;
  region: string;
  postal: string;
}

interface IErrorMessage {
  first_name: string;
  last_name: string;
  line_1: string;
  city: string;
  region: string;
  postal: string;
}

interface IValid {
  first_name: boolean;
  last_name: boolean;
  line_1: boolean;
  city: boolean;
  postal: boolean;
}

interface IDropdownOption {
  label: string;
  value: string;
}

interface IProps {
  isVisible: boolean;
  toggle: () => void;
  handleSubmit: (formData: ICompletedForm) => void;
}

interface IState {
  form: IRatingForm;
  error: IErrorMessage;
  valid: IValid;
  isValid: boolean;
}

class RatingDialog extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      form: {
        first_name: '',
        last_name: '',
        line_1: '',
        line_2: '',
        city: '',
        region: '',
        postal: '',
      },
      error: {
        first_name: '',
        last_name: '',
        line_1: '',
        city: '',
        region: '',
        postal: '',
      },
      valid: {
        first_name: false,
        last_name: false,
        line_1: false,
        city: false,
        postal: false,
      },
      isValid: false,
    };

    this.handleStringInput = this.handleStringInput.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private formValidation(): void {
    this.setState(({ valid, form }: IState) => {
      const { first_name, last_name, line_1, city, postal } = valid;

      if (first_name && last_name && line_1 && city && (form.region.length > 0) && postal) {
        return { isValid: true };
      }

      return { isValid: false };
    });
  }

  private formatStates(): IDropdownOption[] {
    const states = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");

    return states.map((state) => {
      return { label: state, value: state };
    });
  }

  private resetState(): void {
    this.setState({
      form: {
        first_name: '',
        last_name: '',
        line_1: '',
        line_2: '',
        city: '',
        region: '',
        postal: '',
      },
      error: {
        first_name: '',
        last_name: '',
        line_1: '',
        city: '',
        region: '',
        postal: '',
      },
      valid: {
        first_name: false,
        last_name: false,
        line_1: false,
        city: false,
        postal: false,
      },
      isValid: false,
    });
  }

  public closeDialog(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    this.props.toggle();
    this.resetState();
  }

  public handleRegionChange(e: { originalEvent: Event, value: string }): void {
    this.setState((prevState: IState) => {
      return { ...prevState, form: { ...prevState.form, region: e.value } };
    });
  }

  public handleStringInput(e: React.FormEvent<HTMLInputElement>): void {
    e.preventDefault();

    const error = {...this.state.error};
    const valid = {...this.state.valid};
    const { value, name } = e.currentTarget;

    switch (name) {
      case 'first_name': {
        error.first_name =
          value.length > 0
            ? ''
            : 'First Name is required';
        
        error.first_name === ''
          ? valid.first_name = true
          : valid.first_name = false;

        break;
      }

      case 'last_name': {
        error.last_name =
          value.length > 0
            ? ''
            : 'Last Name is required';

        error.last_name === ''
          ? valid.last_name = true
          : valid.last_name = false;

        break;
      }

      case 'line_1': {
        error.line_1 =
          value.length > 0
            ? ''
            : 'Address is required';

        error.line_1 === ''
          ? valid.line_1 = true
          : valid.line_1 = false;
  
        break;
      }

      case 'city': {
        error.city =
          value.length > 0
            ? ''
            : 'City is required';

        error.city === ''
          ? valid.city = true
          : valid.city = false;
  
        break;
      }

      case 'postal': {
        error.postal =
          value.length === 5
            ? ''
            : 'Postal Code must be 5 digits';

        error.postal === ''
          ? valid.postal = true
          : valid.postal = false;
  
        break;
      }
      
      default: {
        break;
      }
    } 
    
    this.setState((prevState: IState) => {
      return {
        ...prevState,
        error,
        valid,
        form: { ...prevState.form, [name]: value }
      } as Pick<IState, any>
    });

    this.formValidation();
  }

  public handleSubmit(e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const { first_name, last_name, line_1, line_2, city, region, postal } = this.state.form;
    const completedForm: ICompletedForm = {
      first_name,
      last_name,
      address: {
        line_1,
        line_2: line_2 === '' ? null : line_2,
        city,
        region,
        postal,
      }
    };

    this.props.handleSubmit(completedForm);
    this.props.toggle();
    this.resetState();
  }

  render() {
    const { isVisible, toggle } = this.props;
    const { form, error, isValid } = this.state;

    const states = this.formatStates();

    const displayFooter = (
      <div>
        <Button label="Cancel" onClick={this.closeDialog} />
        <Button label="Submit" onClick={this.handleSubmit} disabled={!isValid} />
      </div>
    );

    return (
      <Dialog id="rating-dialog" header="Get a Quote" visible={isVisible} focusOnShow={false} modal={true} onHide={toggle} footer={displayFooter}>
        <p className="dialog-description">To get started, please fill out this form.</p>
        <form onSubmit={this.handleSubmit}>
          <div className="p-inputgroup rating-input-group">
            <InputText className="rating-input" placeholder="First Name*" name="first_name" value={form.first_name} onChange={this.handleStringInput} />
            {
              error.first_name.length > 0 &&
              <Message severity="error" text={error.first_name}></Message>
            }
          </div>
          <div className="p-inputgroup rating-input-group">
            <InputText className="rating-input" placeholder="Last Name*" name="last_name" value={form.last_name} onChange={this.handleStringInput} />
            {
              error.last_name.length > 0 &&
              <Message severity="error" text={error.last_name}></Message>
            }
          </div>
          <div className="p-inputgroup rating-input-group">
            <InputText className="rating-input" placeholder="Address Line 1*" name="line_1" value={form.line_1} onChange={this.handleStringInput} />
            {
              error.line_1.length > 0 &&
              <Message severity="error" text={error.line_1}></Message>
            }
          </div>
          <div className="p-inputgroup rating-input-group">
            <InputText className="rating-input" placeholder="Apt, Unit or Suite" name="line_2" value={form.line_2} onChange={this.handleStringInput} />
          </div>
          <div className="p-inputgroup rating-input-group">
            <InputText className="rating-input" placeholder="City*" name="city" value={form.city} onChange={this.handleStringInput} />
            {
              error.city.length > 0 &&
              <Message severity="error" text={error.city}></Message>
            }
          </div>
          <div className="p-inputgroup rating-input-group">
            <Dropdown value={form.region} options={states} placeholder="State*" onChange={this.handleRegionChange} />
          </div>
          <div className="p-inputgroup rating-input-group">
            <InputText className="rating-input" placeholder="Postal Code*" name="postal" keyfilter={/^[0-9]/} value={form.postal} onChange={this.handleStringInput} />
            {
              error.postal.length > 0 &&
              <Message severity="error" text={error.postal}></Message>
            }
          </div>
          <button type="submit" hidden disabled={!isValid} onClick={this.handleSubmit}></button>
        </form>
      </Dialog>
    )
  }
}

export default RatingDialog;
