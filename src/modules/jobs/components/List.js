// @flow
import React, { useCallback, useMemo } from 'react';
import Table from '../../../components/Table';
import { Col, Container, Row } from 'react-bootstrap';

type RequestsType = ({
  employers: Array<Object>,
  updateStatus: Function,
}) => React$Node;

const List: RequestsType = ({ employers, updateStatus }) => {
  const columns: Array<Object> = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Profession',
        accessor: 'profession',
      },
      {
        Header: 'Employer ID',
        accessor: 'employer_id',
      },
      {
        Header: 'Employer',
        accessor: 'name',
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobile_number',
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
      {
        Header: 'Salary',
        accessor: 'salary',
      },
      {
        Header: 'Salary Frequency',
        accessor: 'salary_frequency',
      },
      {
        Header: 'Vacancies',
        accessor: 'vacancies',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Working Days',
        accessor: 'working_days',
      },
      {
        Header: 'Timings',
        accessor: 'timings',
      },
      {
        Header: 'Applications',
        accessor: 'number_of_applications',
      },
      {
        Header: 'Posted At',
        accessor: 'created_at',
      },
      {
        Header: 'Status',
        accessor: 'active',
        Cell: ({
          row: {
            original: { active },
          },
        }) => (active ? 'Active' : 'Inactive'),
      },
      {
        Header: 'Verified',
        accessor: 'verified',
        Cell: ({
          row: {
            original: { id, verified },
          },
        }) => (
          <select
            className="form-control form-control-sm"
            name=""
            id=""
            value={verified.toString()}
            onChange={updateStatus(id)}
            style={{ width: 125 }}>
            <option value="1">Verified</option>
            <option value="0">Not verified</option>
          </select>
        ),
      },
    ],
    [updateStatus],
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
