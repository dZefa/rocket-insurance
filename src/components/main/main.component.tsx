import * as React from 'react';
import axios from 'axios';

import './main.component.css';

import { DefaultView } from './default/default.component';
import { LoadingView } from '../loading/loading.component';
import RatingDialog from '../rating/rating.component';
import QuoteView from '../quote/quote.component';

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

interface IVariableOption {
  title: string;
  description: string;
  values: number[];
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

}

interface IState {
  showForm: boolean;
  quote: IQuote;
  isLoading: boolean;
}

class MainView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showForm: false,
      quote: null,
      isLoading: false,
    };

    this.ratingClickHandler = this.ratingClickHandler.bind(this);
    this.hideRatingDialog = this.hideRatingDialog.bind(this);
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
  }

  private getQuotes(formData: ICompletedForm): Promise<IQuote> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post('https://fed-challenge-api.sure.now.sh/api/v1/quotes', formData);

        resolve(data.quote);
      }
      catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  private toggleRatingDialog(): void {
    this.setState({ showForm: true});
  }

  private startLoading(): void {
    this.setState({ isLoading: true });
  }

  private stopLoading(): void {
    this.setState({ isLoading: false });
  }

  public ratingClickHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    this.toggleRatingDialog();
  }

  public hideRatingDialog(): void {
    this.setState({ showForm: false });
  }

  public async handleRatingSubmit(formData: ICompletedForm): Promise<void> {
    try {
      this.startLoading();
  
      const quote = await this.getQuotes(formData);

      this.setState({ quote });

      setTimeout(() => {
        this.stopLoading();
      }, 2000);
    }
    catch (err) {
      this.setState({ quote: null });
      this.stopLoading();
    }
  }

  render() {
    const { showForm, quote, isLoading } = this.state;

    return (
      <div id="main">
        <RatingDialog isVisible={showForm} toggle={this.hideRatingDialog} handleSubmit={this.handleRatingSubmit} />
        <header id="header" className="base-background">
          <h1>Rocket Insurance 🚀</h1>
        </header>
        <div id="viewport">
          {
            isLoading &&
            <LoadingView></LoadingView>
          }
          {
            (quote && !isLoading) &&
            <QuoteView quote={quote}></QuoteView>
          }
          {
            (!quote && !isLoading) &&
            <DefaultView clickHandler={this.ratingClickHandler}></DefaultView>
          }
        </div>
      </div>
    )
  }
}

export default MainView;
