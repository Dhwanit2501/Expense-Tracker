import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Expire from './Expire';
import './style.css'

import {BudgetsProvider} from "./Contexts/BudgetContext"

ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
      <Expire delay="5000" >Hello<br></br>This is Dhwanit,hope you enjoy my work<br></br>Cheers!!!</Expire>
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

