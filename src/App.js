import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/main.scss';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/:countryName" element={<CountryDetails />} />
        </Routes>
      </Router>
  );
}

export default App;
