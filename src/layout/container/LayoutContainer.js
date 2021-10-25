// @flow
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { signOut } from '../../redux/modules/session';
import { sessionLoggedInSelector } from '../../redux/selectors/session';

type LayoutContainerType = ({ children: React$Node }) => React$Node;

const LayoutContainer: LayoutContainerType = ({ children }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(sessionLoggedInSelector);

  const onSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Layout isLoggedIn={isLoggedIn} onSignOut={onSignOut}>
      {children}
    </Layout>
  );
};

export default LayoutContainer;
