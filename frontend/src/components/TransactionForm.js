import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const TransactionForm = ({ onClose }) => {
  const { addTransaction } = useContext(AppContext);
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense', 
    date: new Date().toISOString().split('T')[0],
    account: 'Cash',
    category: '',
    subcategory: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) {
      alert('Please fill out all required fields.');
      return;
    }
    try {
      await addTransaction(formData);
      setFormData({
        amount: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        account: 'Cash',
        category: '',
        subcategory: '',
      });
      onClose();
      alert('Transaction added successfully!');
    } catch (error) {
      alert('Failed to add transaction. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-container">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h5 className="mb-0">New Transaction</h5>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Account</label>
            <select name="account" value={formData.account} onChange={handleChange}>
              <option value="Bank Account">Bank Account</option>
              <option value="Mobile Money Account">Mobile Money</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Subcategory</label>
            <input
              type="text"
              name="subcategory"
              placeholder="Subcategory"
              value={formData.subcategory}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Add Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;