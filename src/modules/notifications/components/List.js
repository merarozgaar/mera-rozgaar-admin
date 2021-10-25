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
        Header: 'Sender ID',
        accessor: 'sender_id',
      },
      {
        Header: 'Sender',
        accessor: 'sender_name',
      },
      {
        Header: 'Sender Role',
        accessor: 'sender_role',
      },
      {
        Header: 'Receiver ID',
        accessor: 'receiver_id',
      },
      {
        Header: 'Receiver',
        accessor: 'receiver_name',
      },
      {
        Header: 'Receiver Role',
        accessor: 'receiver_role',
      },
      {
        Header: 'Message',
        accessor: 'body',
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
