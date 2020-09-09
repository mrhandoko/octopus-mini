import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import invoice from '../../services/invoice';
import user from '../../services/user';

export default function InvoicePage() {
  const [invoicesData, setInvoicesData] = useState([]);
  const [profile, setProfile] = useState('');
  const [isRestricted, setIsRestricted] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const initiateInvoices = async () => {
    const invoices = await invoice.getAll();
    const users = await user.profile();
    if (invoices.success && users.success) {
      setIsRestricted(false);
      setProfile(users.data.roles[0]);
      setInvoicesData(invoices.data);
    } else {
      setErrorMessage(invoices || users);
    }
  };

  useEffect(() => {
    initiateInvoices();
  }, []);

  const confirmRemove = async (id) => {
    const isRemove = window.confirm(('Remove this invoice?'));
    if (isRemove) {
      const result = await invoice.delete(id);
      if (result.success) {
        window.location.reload();
      }
    }
  };

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
              Login first to access this
              {' '}
              <Link to="/">page</Link>
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
              <b>Invoices Page</b>
            </div>
            {
              (profile === 'staff') && (
                <div
                  style={{
                    display: 'flex',
                    padding: 20,
                    justifyContent: 'flex-end'
                  }}
                >
                  <Link to="/add-invoice" className="btn btn-primary">Add Invoice</Link>
                </div>
              )
            }
            {
              errorMessage && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                </div>
              )
            }
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Invoice Number</th>
                  <th scope="col">Invoice Date</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Total Invoice Amount</th>
                  {
                    (profile !== 'director') && (
                      <th scope="col">Action</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {
                  invoicesData.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.invoiceNumber}</td>
                      <td>{item.invoiceDate}</td>
                      <td>{item.customer.name}</td>
                      <td>{item.invoiceTotalAmount}</td>
                      <td>
                        <span>
                          {
                            (profile !== 'director') && (
                              <Link className="btn btn-success" to={`/edit-invoice/${item.id}`}>Edit</Link>
                            )
                          }
                        </span>
                        {' '}
                        <span>
                          {
                            (profile === 'lead') && (
                              <button type="button" className="btn btn-danger" onClick={() => confirmRemove(item.id)}>Delete</button>
                            )
                          }
                        </span>
                      </td>
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
