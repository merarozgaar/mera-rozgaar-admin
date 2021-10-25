// @flow
import React, { useCallback, useEffect, useState } from 'react';
import List from '../components/List';
import apiClient from '../../../utils/apiClient';
import { toast } from 'react-toastify';

const ListContainer = (): React$Node => {
  const [employers, setEmployers] = useState([]);

  const updateStatus = useCallback(
    (id) =>
      ({ target: { value: status } }) => {
        (async () => {
          try {
            await apiClient.put(`/admin/jobs/${id}/approve`, {
              status: Number(status),
            });

            setEmployers((state) =>
              state.map((j) =>
                j.id === id ? { ...j, verified: Number(status) } : j,
              ),
            );

            toast('Job status updated.');
          } catch (e) {}
        })();
      },
    [],
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get('/admin/jobs');

        setEmployers(data);
      } catch (e) {}
    })();
  }, []);

  return <List employers={employers} updateStatus={updateStatus} />;
};

export default ListContainer;
