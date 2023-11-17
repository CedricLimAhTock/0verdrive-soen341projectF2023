import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './MortgageCalculator.css';

const MortgageCalculator = ({ isOpen, onClose, property }) => {
  if (!isOpen) return null;

  const [homePrice, setHomePrice] = useState(property.price);
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [mortgageResult, setMortgageResult] = useState(0);

  useEffect(() => {
    const calculateMortgage = () => {
      let principal = (homePrice - downPayment);
      let monthlyInterestRate = (interestRate / 12);
      let numberOfPayments = (loanTerm * 12);
      let mortgage =
        ((principal * monthlyInterestRate) * ((1 + monthlyInterestRate) ** numberOfPayments)) /
        (((1 + monthlyInterestRate) ** numberOfPayments) - 1);

      setMortgageResult(mortgage);
      updateChart(mortgage);
    };

    const updateChart = (mortgage) => {
      const ctx = document.getElementById('mortgageChart').getContext('2d');

      const propertyTax = 200;
      const homeownersInsurance = 100;
      const pmi = 50;
      const hoaFees = 30;

      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Principal & Interest', 'Property Tax', "Homeowner's Insurance", 'PMI', 'HOA Fees'],
          datasets: [{
            data: [
              mortgage - propertyTax - homeownersInsurance - pmi - hoaFees, // Principal & Interest
              propertyTax,
              homeownersInsurance,
              pmi,
              hoaFees
            ],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0', '#9966FF'],
          }],
        },
      });
    };

    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm]);


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
            }}
          />
        </label>

        <label>
          Down Payment:
          <input
            type="number"
            placeholder="Enter down payment percentage"
            value={downPayment}
            onChange={(e) => {
              setDownPayment(parseFloat(e.target.value));
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
            }}
          />
        </label>

        <label>
          Mortgage Result:
          <span>${mortgageResult.toFixed(0)}</span>
        </label>

        <div>
          <h2>Mortgage Breakdown</h2>
          <canvas id="mortgageChart" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;