import React, { useState, useEffect }  from 'react';
import { List, FormControl, NativeSelect }  from '@material-ui/core';
import api from './services/api';
import SimpleModal from './SimpleModal';
import Transaction from './Transaction';
import './global.css';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [dates, setDates] = useState([]);
  const [dateSelected, setDateSelected] = useState();

  useEffect(() => {
    async function loadDates(){
      const response = await api.get('/searchDate');
      setDates(response.data.yearMonth);
    };
    console.log(dates[0]);
    async function loadTransaction() {
      const response = await api.get('/search?yearMonth='+dates[0]);
      setTransactions(response.data.transaction);
    };

    loadDates();
    loadTransaction();
  }, [dates[0]]);

  useEffect(() => {
    async function loadTransaction() {
      const response = await api.get('/search?yearMonth='+dateSelected);
      setTransactions(response.data.transaction);
    };

    loadTransaction();
  }, [dateSelected]);

  const handleChange = (event) => {
    setDateSelected(event.target.value);
  };

  async function handleAddTransaction(data) {
    console.log(data);
    const response = await api.post('/', data)
    setTransactions([...transactions, response.data]);
  }

  return (
    <div id="app">
      <header>
        <strong>Bootcamp Full Stack - Desafio Final</strong>
        <h3>Controle Financeiro Pessoal</h3>

        <FormControl>
          <NativeSelect onChange={handleChange}>
           {dates.map((date, index) =>
              <option value={date}>
                {date}
              </option>
            )}
          </NativeSelect>
        </FormControl>

        <SimpleModal onSubmit={handleAddTransaction} /> 
      </header>
      <main>
        <List>
          {transactions.map(transaction => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}
        </List>
      </main>
    </div>
  );
}

export default App;
