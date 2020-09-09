import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import invoice from '../../services/invoice';
import styles from './style';

export default function EditInvoicePage(props) {
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceTotalAmount, setInvoiceTotalAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getInvoiceById = async () => {
    // eslint-disable-next-line react/prop-types
    const { id } = props.match.params;
    const result = await invoice.getById(id);
    if (result && result.data) {
      setCustomerName(result.data.customer.name);
      setCustomerPhone(result.data.customer.phone);
      setCustomerAddress(result.data.customer.address);
      setInvoiceNumber(result.data.invoiceNumber);
      setInvoiceTotalAmount(result.data.invoiceTotalAmount);
    } else {
      setErrorMessage(result);
    }
  };

  useEffect(() => {
    getInvoiceById();
  }, []);

  const handleUpdateInvoice = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (customerName === '' || customerPhone === ''
      || customerAddress === '' || invoiceNumber === ''
      || invoiceTotalAmount === ''
    ) {
      setErrorMessage('Form can\'t be blank');
    }

    // eslint-disable-next-line react/prop-types
    const { id } = props.match.params;

    const result = await invoice.update({
      id,
      invoiceNumber,
      invoiceTotalAmount
    });

    if (result.success) {
      setSuccessMessage('Update invoice successfully');
      setErrorMessage('');
      setLoading(false);
    } else {
      setErrorMessage(result);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={styles.pageContainer}>
      <div style={styles.titleContainer}>
        <b>Update Invoice</b>
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
              disabled
            />
          </div>
          <div className="form-group">
            <label>Customer Phone</label>
            <input
              type="text"
              className="form-control"
              name="customerPhone"
              value={customerPhone}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Customer Address</label>
            <input
              type="text"
              className="form-control"
              name="customerAddress"
              value={customerAddress}
              disabled
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
              onClick={handleUpdateInvoice}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm" />
              )}
              <span>Create Update Invoice</span>
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
