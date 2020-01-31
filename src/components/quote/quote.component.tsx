import * as React from 'react';
import { Card } from 'primereact/card';

import './quote.component.css';

import OptionView from './option/option.component';

interface IVariableOption {
  title: string;
  description: string;
  values: number[];
}

interface IAddress {
  line_1: string;
  line_2?: string;
  city: string;
  region: string;
  postal: string;
}

interface IQuote {
  quoteId: string;
  rating_address: IAddress;
  policy_holder: {
    first_name: string;
    last_name: string;
  };
  variable_options: {
    deductible: IVariableOption;
    asteroid_collision: IVariableOption;
  };
  variable_selections: {
    deductible: number;
    asteroid_collision: number;
  };
  premium: number;
}

interface IProps {
  quote: IQuote;
}

interface IState {

}

class QuoteView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};

    this.formatCurrency = this.formatCurrency.bind(this);
  }

  public formatCurrency(amount: number): string {
    const dollar = (amount / 100) === 0 ? '00' : amount / 100;
    const cent = amount % 100 === 0 ? '00' : amount % 100;

    return `$${dollar}.${cent}`;
  }

  render() {
    const { policy_holder, variable_options, variable_selections, premium } = this.props.quote;

    return (
      <div id="quote-view">
        <Card
          title={`Quote for ${policy_holder.first_name + ' ' + policy_holder.last_name}`}
          subTitle={`Premium: ${this.formatCurrency(premium)}`}
        >
          <div id="card-content">
            <OptionView option={variable_options.deductible} selection={variable_selections.deductible} formatCurrency={this.formatCurrency} />
            <OptionView option={variable_options.asteroid_collision} selection={variable_selections.asteroid_collision} formatCurrency={this.formatCurrency} />
          </div>
        </Card>
      </div>
    )
  }
}

export default QuoteView;
