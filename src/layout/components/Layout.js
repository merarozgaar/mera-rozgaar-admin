// @flow
import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAppRoutes } from '../../utils/contentProviders';

type LayoutType = ({
  children: React$Node,
  isLoggedIn: boolean,
  onSignOut: Function,
}) => React$Node;

const Layout: LayoutType = ({ children, isLoggedIn, onSignOut }) => {
  return (
    <div className="d-none d-md-block">
      {isLoggedIn && (
        <nav className="d-print-none fixed-top bg-white border-bottom">
          <Navbar
            className="d-flex align-items-center container-fluid bg-transparent"
            expand="lg"
            style={{ height: '64px' }}>
            <Navbar.Brand
              as={Link}
              to={getAppRoutes().home}
              className="d-flex align-items-center mr-auto font-weight-bold text-primary">
              Mera Rozgaar Admin
            </Navbar.Brand>
            <Nav className="align-items-md-center ml-auto">
              <Nav.Link
                className="font-weight-bold text-primary"
                as={Link}
                to={getAppRoutes().jobs}>
                Jobs
              </Nav.Link>
              <Nav.Link
                className="font-weight-bold text-primary"
                as={Link}
                to={getAppRoutes().employer}>
                Employers
              </Nav.Link>
              <Nav.Link
                className="font-weight-bold text-primary"
                as={Link}
                to={getAppRoutes().employee}>
                Employees
              </Nav.Link>
              <Nav.Link
                className="font-weight-bold text-primary"
                as={Link}
                to={getAppRoutes().interviews}>
                Interviews
              </Nav.Link>
              <Nav.Link
                className="font-weight-bold text-primary"
                as={Link}
                to={getAppRoutes().notifications}>
                Notifications
              </Nav.Link>
              <Nav.Link
                className="font-weight-bold text-primary"
                as={Button}
                variant="link"
                onClick={onSignOut}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar>
        </nav>
      )}
      <div className={isLoggedIn ? 'mt-5 pt-3' : ''}>{children}</div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        transition={Slide}
        hideProgressBar
        newestOnTop
        limit={1}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        toastClassName="py-2 px-3 text-light bg-dark"
      />
    </div>
  );
};

export default Layout;
