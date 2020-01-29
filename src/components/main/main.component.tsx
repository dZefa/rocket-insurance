import * as React from 'react';

import './main.component.css';

import { DefaultView } from './default/default.component';
import RatingDialog from '../rating/rating.component';

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
    this.hideRatingDialog = this.hideRatingDialog.bind(this);
  }

  public ratingClickHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    this.toggleRatingDialog();
  }

  private toggleRatingDialog(): void {
    this.setState({ showForm: true});
  }

  public hideRatingDialog(): void {
    this.setState({ showForm: false });
  }

  render() {
    const { showForm } = this.state;

    return (
      <div id="main">
        <RatingDialog isVisible={showForm} toggle={this.hideRatingDialog} />
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
