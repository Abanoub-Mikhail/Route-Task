import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default function TableData({ arr1, arr2 }) {
  const [filterName, setFilterName] = useState('');
  const [filterAmount, setFilterAmount] = useState('');

  const combineData = () => {
    let combinedDataById = {};

    arr1.forEach(item1 => {
      let matchingItems = arr2.filter(item2 => item1.id === String(item2.customer_id));

      if (matchingItems.length > 0) {
        if (!combinedDataById[item1.id]) {
          combinedDataById[item1.id] = {
            id: item1.id,
            name: item1.name,
            dates: [],
            amounts: []
          };
        }
        matchingItems.forEach(matchingItem => {
          combinedDataById[item1.id].dates.push(matchingItem.date);
          combinedDataById[item1.id].amounts.push(matchingItem.amount);
        });
      }
    });

    let combinedData = Object.values(combinedDataById);

    if (filterName !== '') {
      combinedData = combinedData.filter(item => item.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    if (filterAmount !== '') {
      combinedData = combinedData.filter(item => item.amounts.some(amount => amount.toString().includes(filterAmount)));
    }

    return combinedData;
  };

  const handleNameFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleAmountFilterChange = (event) => {
    setFilterAmount(event.target.value);
  };

  const combinedData = combineData();

  return (
    <>
      <section className='d-flex justify-content-center align-items-center gap-5 text-center mb-4'>
        <Form.Group>
          <Form.Label className='text-primary fw-bolder'>Filter by Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name..."
            value={filterName}
            onChange={handleNameFilterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='text-primary fw-bolder'>Filter by Transaction Amount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Amount..."
            value={filterAmount}
            onChange={handleAmountFilterChange}
          />
        </Form.Group>
      </section>

      <Table striped bordered hover className="align-middle">
        <thead>
          <tr className='text-center'>
            <th>ID</th>
            <th>Name</th>
            <th>Dates</th>
            <th>Amounts</th>
            <th>Graph</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map(item => (
            <tr key={item.id}>
              <td className='text-center'>{item.id}</td>
              <td className='text-center'>{item.name}</td>
              <td>
                <ul className='m-0'>
                  {item.dates.map((date, index) => (
                    <li key={index}>{date}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className='m-0'>
                  {item.amounts.map((amount, index) => (
                    <li key={index}>{amount}</li>
                  ))}
                </ul>
              </td>
              <td>
                <div className=' w-50 m-auto'>
                <Bar
                  data={{
                    labels: item.dates,
                    datasets: [{
                      label: 'Total Transaction Amount',
                      data: item.amounts,
                      backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)'],
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 0.2,
                    }]
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
