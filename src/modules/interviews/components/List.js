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
        Header: 'Job ID',
        accessor: 'job_id',
      },
      {
        Header: 'Job',
        accessor: 'profession',
      },
      {
        Header: 'Applicant ID',
        accessor: 'applicant_id',
      },
      {
        Header: 'Applicant',
        accessor: 'applicant_name',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Timings',
        accessor: 'time',
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
