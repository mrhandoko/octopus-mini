import React, { useEffect, useState } from 'react';
import moment from 'moment';

import report from '../../services/report';

export default function ReportPage() {
  const [dataReports, setDataReports] = useState('');
  const [isRestricted, setIsRestricted] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const getReports = async () => {
    const result = await report.getAll();
    if (result.success) {
      setIsRestricted(false);
      setDataReports(result.data);
    } else {
      setErrorMessage(result);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="container">
      {
        isRestricted ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div>
              {
                errorMessage && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  </div>
                )
              }
            </div>
            <div>
              This page is director authorized only
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <b>Report Page</b>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Phone</th>
                  <th scope="col">Customer Address</th>
                  <th scope="col">Last Invoice ID</th>
                  <th scope="col">Last Invoice Date</th>
                  <th scope="col">Last Invoice Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataReports.length && dataReports.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.invoice_no}</td>
                      <td>{moment(item.invoice_date).format('DD MMMM YYYY')}</td>
                      <td>{item.invoice_total_amount}</td>
                    </tr>
                  ))
                  }
              </tbody>
            </table>
          </>
        )
      }
    </div>
  );
}
