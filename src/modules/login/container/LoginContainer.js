// @flow
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/Login';
import type { FormConfig } from '../../../hooks/useForm';
import useForm from '../../../hooks/useForm';
import apiClient from '../../../utils/apiClient';
import { getAppRoutes } from '../../../utils/contentProviders';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../../redux/modules/session';
import { sessionLoggedInSelector } from '../../../redux/selectors/session';

const LoginContainer = (): React$Node => {
  const history = useHistory();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(sessionLoggedInSelector);

  const [loading, setLoading] = useState(false);

  const formConfig: FormConfig = {
    initialValues: {
      dial_code: '+91',
      mobile_number: '',
      otp: '',
    },
    validations: {},
    onSubmit: (values) => {
      (async () => {
        try {
          setLoading(true);

          const { mobile_number } = values;

          const { data } = await apiClient.post('/auth/verify_otp', {
            ...values,
            mobile_number: mobile_number.replace(/\+91| /gi, ''),
          });

          dispatch(signIn(data));
        } catch (e) {
        } finally {
          setLoading(false);
        }
      })();
    },
  };

  const formProps = useForm(formConfig);

  useEffect(() => {
    if (isLoggedIn) {
      history.push(getAppRoutes().jobs);
    }
  }, [history, isLoggedIn]);

  return <Login {...formProps} loading={loading} />;
};

export default LoginContainer;
