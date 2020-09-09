import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import invoice from '../../services/invoice';
import styles from './style';

export default function AddInvoicePage() {
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceTotalAmount, setInvoiceTotalAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateInvoice = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (customerName === '' || customerPhone === ''
      || customerAddress === '' || invoiceNumber === ''
      || invoiceTotalAmount === ''
    ) {
      setErrorMessage('Form can\'t be blank');
    }
    const result = await invoice.create({
      customerName,
      customerPhone,
      customerAddress,
      invoiceNumber,
      invoiceTotalAmount
    });
    if (result.success) {
      setSuccessMessage('Create invoice successfully');
      setErrorMessage('');
    } else {
      setErrorMessage(result);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={styles.pageContainer}>
      <div style={styles.titleContainer}>
        <b>Add New Invoice</b>
      </div>
      <div style={styles.formLogin}>
        <form>
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              className="form-control"
              name="customerName"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Customer Phone</label>
            <input
              type="text"
              className="form-control"
              name="customerPhone"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Customer Address</label>
            <input
              type="text"
              className="form-control"
              name="customerAddress"
              value={customerAddress}
              onChange={(event) => setCustomerAddress(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Invoice Number</label>
            <input
              type="text"
              className="form-control"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Invoice Total Amount</label>
            <input
              type="text"
              className="form-control"
              value={invoiceTotalAmount}
              onChange={(event) => setInvoiceTotalAmount(event.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary btn-block"
              disabled={loading}
              onClick={handleCreateInvoice}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm" />
              )}
              <span>Create New Invoice</span>
            </button>
          </div>

          {successMessage && (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
              <Link to="/" className="btn btn-primary">Back to Invoice List</Link>
            </div>
          )}
          {
            errorMessage && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              </div>
            )
          }
        </form>
      </div>
    </div>
  );
}
