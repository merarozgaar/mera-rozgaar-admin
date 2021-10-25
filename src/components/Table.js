// @flow
import React from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { CSVLink } from 'react-csv';
import Icon from './Icon';

type TableType = ({
  columns: Array<Object>,
  data: Array<Object>,
  csvData: Array<Object>,
  loading: boolean,
}) => React$Node;

const Table: TableType = ({ columns, data, csvData, loading = true }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <div className="my-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <p className="mb-0">Showing</p>
          <select
            className="mx-2 form-control form-control-sm rounded"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}>
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <p className="mb-0">entries</p>
        </div>
        <div className="d-flex">
          <div className="form-inline">
            <div className="form-group">
              <label>Search:</label>
              <input
                className="ml-md-3 form-control form-control-sm rounded"
                type="search"
                value={globalFilter || ''}
                onChange={({ target: { value } }) =>
                  setGlobalFilter(value || undefined)
                }
              />
            </div>
            <CSVLink
              className="ml-md-3 d-block btn btn-sm btn-outline-primary rounded"
              filename="report.csv"
              data={csvData}>
              Export CSV <Icon name="fa-download" />
            </CSVLink>
          </div>
        </div>
      </div>
      <div className="table-responsive my-3">
        <table
          className="mb-0 table table-bordered"
          {...getTableProps()}
          style={{ whiteSpace: 'nowrap' }}>
          <thead>
            {headerGroups.map((headerGroup, rowIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={rowIndex}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    className="align-middle"
                    scope="col"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={columnIndex}>
                    {column.render('Header')}
                    <Icon icon="sort" className="ml-3" />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {loading ? (
              <tr>
                <td colSpan={columns.length}>Loading...</td>
              </tr>
            ) : page.length ? (
              page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, columnIndex) => {
                      return (
                        <td {...cell.getCellProps()} key={columnIndex}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length}>No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div>
          <p className="mb-0">
            Showing {pageIndex + 1} to {(pageIndex + 1) * pageSize} of{' '}
            {pageOptions.length} entries
          </p>
        </div>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => gotoPage(0)}>
                &laquo;
              </button>
            </li>
            <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => previousPage()}>
                Previous
              </button>
            </li>
            <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => nextPage()}>
                Next
              </button>
            </li>
            <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => gotoPage(pageCount - 1)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
