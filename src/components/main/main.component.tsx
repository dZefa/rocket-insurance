import * as React from 'react';

import './main.component.css';

import { DefaultView } from './default/default.component';

interface IProps {

}

interface IState {
  showForm: boolean;
}

class MainView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showForm: false,
    };

    this.ratingClickHandler = this.ratingClickHandler.bind(this);
  }

  public ratingClickHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    this.setState({ showForm: true });
  }

  render() {
    return (
      <div id="main">
        <header id="header">
          <h1>Rocket Insurance</h1>
        </header>
        <div id="viewport">
          <DefaultView clickHandler={this.ratingClickHandler}></DefaultView>
        </div>
      </div>
    )
  }
}

export default MainView;
