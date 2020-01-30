import * as React from 'react';

import './main.component.css';

import { DefaultView } from './default/default.component';
import RatingDialog from '../rating/rating.component';

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
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
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

  public handleRatingSubmit(formData: ICompletedForm): void {
    console.log(formData);
  }

  render() {
    const { showForm } = this.state;

    return (
      <div id="main">
        <RatingDialog isVisible={showForm} toggle={this.hideRatingDialog} handleSubmit={this.handleRatingSubmit} />
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
