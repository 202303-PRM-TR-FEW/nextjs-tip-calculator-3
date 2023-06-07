import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [billAmount, setBillAmount] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [totalTip, setTotalTip] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [customTip, setCustomTip] = useState('');
  //test for displaying the error message for number of people
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  useEffect(() => {
    if (peopleAmount === 0 && billAmount > 0 && tipAmount > 0) {
      const timeout = setTimeout(() => {
        setDisplayErrorMessage(true);
      }, 2000);

      return () => clearTimeout(timeout); // Cleanup the timeout if the component unmounts before it's triggered
    } else {
      setDisplayErrorMessage(false);
    }
  }, [peopleAmount, billAmount, tipAmount]);

  useEffect(() => {
    calculateAmounts();
  }, [billAmount, tipAmount, peopleAmount, customTip]);

  //end of test

  const calculateAmounts = () => {
    if (billAmount > 0 && peopleAmount > 0) {
      let tipPercentage = tipAmount;
      if (customTip !== '') {
        tipPercentage = parseFloat(customTip);
      }
      const tipPerPerson = parseFloat((billAmount * tipPercentage) / 100 / peopleAmount).toFixed(2);
      const totalPerPerson = parseFloat((parseFloat(tipPerPerson) + parseFloat(billAmount)) / peopleAmount).toFixed(2);
      setTotalTip(tipPerPerson);
      setTotalBill(totalPerPerson);
    }
  };

  const resetCalculator = () => {
    setBillAmount(0);
    setTipAmount(0);
    setPeopleAmount(0);
    setTotalTip(0);
    setTotalBill(0);
    setCustomTip('');
  };

  const billAmountHandler = (e) => {
    setBillAmount(e.target.value);
  };

  const tipAmountHandler = (e) => {
    setTipAmount(e.target.value);
  };

  const peopleAmountHandler = (e) => {
    setPeopleAmount(e.target.value);
  };

  const customTipHandler = (e) => {
    setCustomTip(e.target.value);
  };

  return (
    <main>
      <img
        src="./icons/logo.svg"
        className="logo"
        alt="Splitter logo. 'SPLI' on one line and 'TTER' on another to indicate splitting."
      />
      <section className="card">
        <div className="card-left">
          <div className="input-group" id="totalBillGroup">
            <div className="input-label-container">
              <label className="body-text input-label" htmlFor="totalBill">
                Bill
              </label>
              <small className="body-text input-error" id="totalBillError">
                Input field is valid
              </small>
            </div>
            <input
              type="number"
              className="body-l-text input-field"
              placeholder="0"
              name="Total bill value"
              id="totalBill"
              onChange={billAmountHandler}
              value={billAmount}
            />
          </div>

          <div className="input-group" id="totalTipPercentageGroup">
            <div className="input-label-container">
              <label className="body-text input-label">Select Tip %</label>
              <small className="body-text input-error" id="totalTipPercentageError">
                Input field is valid
              </small>
            </div>
            <div className="input-tips-container">
              <button onClick={tipAmountHandler} value={5} className="body-l-text input-tip" id="tip5">
                5%
              </button>
              <button onClick={tipAmountHandler} value={10} className="body-l-text input-tip" id="tip10">
                10%
              </button>
              <button onClick={tipAmountHandler} value={15} className="body-l-text input-tip" id="tip15">
                15%
              </button>
              <button onClick={tipAmountHandler} value={25} className="body-l-text input-tip" id="tip25">
                25%
              </button>
              <button onClick={tipAmountHandler} value={50} className="body-l-text input-tip" id="tip50">
                50%
              </button>
              <input
                type="number"
                className="body-l-text input-field"
                placeholder="Custom"
                id="totalTipPercentage"
                value={customTip}
                onChange={customTipHandler}
              />
            </div>
          </div>

          <div className="input-group" id="numberOfPeopleGroup">
            <div className="input-label-container">
              <label className="body-text input-label" htmlFor="numberOfPeople">
                Number of People
              </label>
              <small style={{ display: displayErrorMessage ? 'block' : 'none' }} className="body-text input-error" id="numberOfPeopleError">
                Please fill this field
              </small>
            </div>
            <input
              type="number"
              className="body-l-text input-field"
              placeholder="0"
              name="Number of people"
              id="numberOfPeople"
              onInput={peopleAmountHandler}
              value={peopleAmount}
            />
          </div>
        </div>
        <div className="card-right">
          <section className="card-price-container">
            <div>
              <b className="body-text card-price-title">Tip Amount</b>
              <p className="body-s-text card-price-subtitle">/ person</p>
            </div>
            <strong className="strong-text card-price-value" id="tipAmount">
              {totalTip > 0 ? <p>${totalTip}</p> : <p>$0.00</p>}
            </strong>
          </section>
          <section className="card-price-container">
            <div>
              <b className="body-text card-price-title">Total</b>
              <p className="body-s-text card-price-subtitle">/ person</p>
            </div>
            <strong className="strong-text card-price-value" id="totalPrice">
              {totalBill > 0 ? <p>${totalBill}</p> : <p>$0.00</p>}
            </strong>
          </section>
          <button className="btn btn-primary btn-reset" onClick={resetCalculator}>
            Reset
          </button>
        </div>
      </section>
    </main>
  );
};

export default Calculator;
