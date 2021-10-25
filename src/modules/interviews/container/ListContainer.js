// @flow
import React, { useEffect, useState } from 'react';
import List from '../components/List';
import apiClient from '../../../utils/apiClient';

const ListContainer = (): React$Node => {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get('/admin/interviews');

        setEmployers(data);
      } catch (e) {}
    })();
  }, []);

  return <List employers={employers} />;
};

export default ListContainer;
