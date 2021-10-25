// @flow
import React, { useCallback, useMemo } from 'react';
import Table from '../../../components/Table';
import { Col, Container, Row } from 'react-bootstrap';

type RequestsType = ({
  employers: Array<Object>,
}) => React$Node;

const List: RequestsType = ({ employers }) => {
  const columns: Array<Object> = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobile_number',
      },
      {
        Header: 'Education',
        accessor: 'education',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Locality',
        accessor: 'locality',
      },
      {
        Header: 'Pin Code',
        accessor: 'pin_code',
      },
      {
        Header: 'Address',
        accessor: 'street_address',
      },
    ],
    [],
  );

  const generateCSVData = useCallback(() => {
    const headers = columns.map(({ Header }) => Header);

    const rows = employers.reduce((a, c) => {
      const row = columns.reduce(
        (a, { Header, accessor }) => ({ ...a, [Header]: c[accessor] }),
        {},
      );

      return [...a, Object.values(row)];
    }, []);

    return [headers, ...rows];
  }, [columns, employers]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Table
              columns={columns}
              data={employers}
              csvData={generateCSVData()}
              loading={false}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default List;
