import * as React from 'react';
import { render } from 'react-dom';

import MainView from './components/main/main.component';

import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './index.css';

render(
  <MainView></MainView>,
  document.getElementById('root')
);
