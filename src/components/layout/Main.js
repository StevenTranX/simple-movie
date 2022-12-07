import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Main = () => {
  // Main > Header > Outlet > Home page ~ Movie Page
  return (
    <Fragment>
      <Header></Header>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Main;
