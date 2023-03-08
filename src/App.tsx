import React from 'react';
import logo from './logo.svg';
import './App.css';
import CouponBanner from "./components/CouponBanner/CouponBanner"

function App(): JSX.Element {
  return (
    <div className="App">
        <CouponBanner></CouponBanner>
    </div>
  );
}

export default App;
