// @flow
import React from 'react';

type LoaderType = () => React$Node;

const Loader: LoaderType = () => (
  <div className="loader">
    <div className="pulse" />
  </div>
);

export default Loader;
