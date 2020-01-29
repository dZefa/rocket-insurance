import * as React from 'react';

import './main.component.css';

interface IProps {

}

interface IState {

}

class MainView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="main">
        <header id="header">
          <h1>Rocket Insurance</h1>
        </header>
        <div id="dynamic-view">
        </div>
      </div>
    )
  }
}

export default MainView;
