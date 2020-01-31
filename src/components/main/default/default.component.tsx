import * as React from 'react';
import { Button } from 'primereact/button';

import './default.component.css';

interface IProps {
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function DefaultView(props: IProps) {
  return (
    <div id="default-view">
      <div id="description" className="base-background">
        <p>As interplanetary travel becomes mainstream, we're excited to offer rocket owners comprehensive coverage options to let them fly through space worry-free.</p>
      </div>
      <div id="default-button-row">
        <Button label="Get a Quote" className="p-button-raised p-button-rounded" onClick={props.clickHandler} />
      </div>
    </div>
  )
}
