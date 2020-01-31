import * as React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

import './loading.component.css';

interface IProps {

}

export function LoadingView(props: IProps) {
  return (
    <div id="loading" className="base-background">
      <ProgressSpinner></ProgressSpinner>
      <div id="loading-description">
        <h1>Jupiter recognize!</h1>
        <h3>We're getting you the best quote in the universe!</h3>
      </div>
    </div>
  )
}
