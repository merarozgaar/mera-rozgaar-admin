// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faChartArea,
  faChartPie,
  faSignOutAlt,
  faSpinner,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faPhone,
  faComment,
  faUsers,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { far, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

library.add(
  faBars,
  faChartArea,
  faChartPie,
  faSignOutAlt,
  faSpinner,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSearch,
  faChevronRight,
  faChevronLeft,
  far,
  faTimesCircle,
  faPhone,
  faComment,
  faUsers,
  faSort,
);

type IconType = (any) => React$Node;

const Icon: IconType = (props) => <FontAwesomeIcon {...props} />;

export default Icon;
