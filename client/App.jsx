import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-dates/initialize';

import Container from './Container';

import './App.scss';


const App = () => (
    <Router>
        <div className="page-container">
            <div className="body-container">
                <Container />
            </div>
        </div>
    </Router>
);

export default App;
