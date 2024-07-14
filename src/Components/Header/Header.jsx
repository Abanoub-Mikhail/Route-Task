import React, { useEffect, useState } from 'react'
import TableData from '../TableData/TableData'
import axios from 'axios';

export default function Header() {
  const [data1 , setData1] = useState([]);
  const [data2 , setData2] = useState([]);

  async function getData1() {
    let {data} = await axios.get('http://localhost:3000/customers')
    setData1(data)
  }
  async function getData2() {
    let {data} = await axios.get('http://localhost:3000/transactions')
    setData2(data)
  }

  useEffect(() => {
    getData1();
    getData2();
  }, [])
  


  return (
    <>
    <h1 className=' text-capitalize h2 text-danger fw-bolder text-center m-0 mb-4'>customer data</h1>
    <TableData arr1={data1} arr2={data2}/>
    </>
  )
}
