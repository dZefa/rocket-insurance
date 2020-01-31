import * as React from 'react';
import { Dropdown } from 'primereact/dropdown';

interface IVariableOption {
  title: string;
  description: string;
  values: number[];
}

interface IDropdownOption {
  label: string;
  value: number;
}

interface IProps {
  option: IVariableOption;
  selection: number;
  formatCurrency: (amount: number) => string;
}

interface IState {
  value: number;
}

class OptionView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: props.selection,
    };

    this.handleVariableChange = this.handleVariableChange.bind(this);
  }

  private formatOptions(): IDropdownOption[] {
    const { values } = this.props.option;

    return values.map((val: number) => {
      return { label: this.props.formatCurrency(val), value: val };
    });
  }

  public handleVariableChange(e: { originalEvent: Event, value: number }): void {
    this.setState({ value: e.value });
  }

  render() {
    const { title, description } = this.props.option;

    const options = this.formatOptions();

    return (
      <div className="option-view">
        <h3>{title}</h3>
        <p>{description}</p>
        <form>
          <Dropdown value={this.state.value} options={options} onChange={this.handleVariableChange} />
        </form>
      </div>
    )
  }
}

export default OptionView;
