import * as React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';

import './rating.component.css';

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

interface IDropdownOption {
  label: string;
  value: string;
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
      valid: false,
    };

    this.handleStringInput = this.handleStringInput.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
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

  private formatStates(): IDropdownOption[] {
    const states = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");

    return states.map((state) => {
      return { label: state, value: state };
    });
  }

  public handleRegionChange(e: { originalEvent: Event, value: string }): void {
    this.setState({
      form: { region: e.value }
    } as Pick<IState, any>);
  }

  public handleStringInput(e: React.FormEvent<HTMLInputElement>): void {
    e.preventDefault();

    const error = {...this.state.error};
    const { value, name } = e.currentTarget;

    switch (name) {
      case 'first_name': {
        error.first_name =
          value.length > 0
            ? ''
            : 'First Name is required';
        
        break;
      }

      case 'last_name': {
        error.last_name =
          value.length > 0
            ? ''
            : 'Last Name is required';

        break;
      }

      case 'line_1': {
        error.line_1 =
          value.length > 0
            ? ''
            : 'Address is required';

        break;
      }

      case 'city': {
        error.city =
          value.length > 0
            ? ''
            : 'City is required';

        break;
      }

      case 'region': {
        error.region =
          value.length === 2
            ? ''
            : 'State is required';

        break;
      }

      case 'postal': {
        error.postal =
          value.length === 5
            ? ''
            : 'postal Code must be 5 digits';

        break;
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

    const states = this.formatStates();

    return (
      <Dialog id="rating-dialog" header="Get a Quote" visible={isVisible} focusOnShow={false} modal={true} onHide={toggle}>
        <form>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="First Name*" name="first_name" value={form.first_name || ''} onChange={this.handleStringInput} />
            {
              error.first_name.length > 0 &&
              <Message severity="error" text={error.first_name}></Message>
            }
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="Last Name*" name="last_name" value={form.last_name || ''} onChange={this.handleStringInput} />
            {
              error.last_name.length > 0 &&
              <Message severity="error" text={error.last_name}></Message>
            }
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="Address Line 1*" name="line_1" value={form.line_1 || ''} onChange={this.handleStringInput} />
            {
              error.line_1.length > 0 &&
              <Message severity="error" text={error.line_1}></Message>
            }
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="Apt, Unit or Suite" name="line_2" value={form.line_2 || ''} onChange={this.handleStringInput} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="City*" name="city" value={form.city || ''} onChange={this.handleStringInput} />
            {
              error.city.length > 0 &&
              <Message severity="error" text={error.city}></Message>
            }
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <Dropdown value={form.region} options={states} placeholder="Select a State" onChange={this.handleRegionChange} />
            {
              error.region.length > 0 &&
              <Message severity="error" text={error.region}></Message>
            }
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText placeholder="postal Code*" name="postal" keyfilter={/^[0-9]/} value={form.postal || ''} onChange={this.handleStringInput} />
            {
              error.postal.length > 0 &&
              <Message severity="error" text={error.postal}></Message>
            }
          </div>
        </form>
      </Dialog>
    )
  }
}

export default RatingDialog;
