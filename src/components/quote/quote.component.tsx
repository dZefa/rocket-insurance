import * as React from 'react';

import './quote.component.css';

interface IProps {

}

interface IState {

}

class QuoteView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>Quote View!</div>
    )
  }
}

export default QuoteView;
