import React, { useState } from 'react';
import './MortgageCalculator.css';

const MortgageCalculator = ({ isOpen, onClose, property }) => {
    if (!isOpen) return null;

  const [homePrice, setHomePrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [propertyTaxes, setPropertyTaxes] = useState(0);
  const [homeownersInsurance, setHomeownersInsurance] = useState(0);
  const [pmiRate, setPmiRate] = useState(0);
  const [mortgageResult, setMortgageResult] = useState(0);

  const calculateMortgage = () => {
    const principal = homePrice - (homePrice * (downPayment / 100));
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    const mortgage =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    
    setMortgageResult(mortgage);
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="form">
        <button onClick={onClose} className="close-button">
          Close
        </button>
        <h2>Mortgage Calculator</h2>

        <label>
          Home Price:
          <input
            type="number"
            placeholder="Enter home price"
            value={homePrice}
            onChange={(e) => {
              setHomePrice(parseFloat(e.target.value));
              calculateMortgage();
            }}
          />
        </label>

        <label>
          Down Payment (%):
          <input
            type="number"
            placeholder="Enter down payment percentage"
            value={downPayment}
            onChange={(e) => {
              setDownPayment(parseFloat(e.target.value));
              calculateMortgage();
            }}
          />
        </label>

        <label>
          Interest Rate (%):
          <input
            type="number"
            placeholder="Enter annual interest rate"
            value={interestRate}
            onChange={(e) => {
              setInterestRate(parseFloat(e.target.value));
              calculateMortgage();
            }}
          />
        </label>

        <label>
          Loan Term (Years):
          <input
            type="number"
            placeholder="Enter loan term in years"
            value={loanTerm}
            onChange={(e) => {
              setLoanTerm(parseFloat(e.target.value));
              calculateMortgage();
            }}
          />
        </label>

        <label>
          Property Taxes ($):
          <input
            type="number"
            placeholder="Enter annual property tax amount"
            value={propertyTaxes}
            onChange={(e) => {
              setPropertyTaxes(parseFloat(e.target.value));
              calculateMortgage();
            }}
          />
        </label>

        <label>
          Homeowner's Insurance ($):
          <input
            type="number"
            placeholder="Enter annual homeowner's insurance cost"
            value={homeownersInsurance}
            onChange={(e) => {
              setHomeownersInsurance(parseFloat(e.target.value));
              calculateMortgage();
            }}
          />
        </label>

        <label>
          Private Mortgage Insurance (PMI) (%):
          <input
            type="number"
            placeholder="Enter PMI percentage (if applicable)"
            value={pmiRate}
            onChange={(e) => {
              setPmiRate(parseFloat(e.target.value));
              calculateMortgage();
            }}
          />
        </label>

        <label>
          Mortgage Result:
          <span>${mortgageResult.toFixed(2)}</span>
        </label>
      </div>
    </div>
  );
};

export default MortgageCalculator;
