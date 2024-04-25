import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import moment from 'moment'
import Spinner from '../components/Spinner'
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')

  // table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',

    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',

    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Actions'
    }
  ]



  //  useEffect hook 
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transactions/gettransaction', { userid: user._id, frequency, selectedDate, type, });
        setLoading(false)
        setAllTransaction(res.data)
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error('Fetch issue with transaction')
      }
    }
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  // form handling 
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      await axios.post('/transactions/addtransaction', { ...values, userid: user._id })
      setLoading(false)
      message.success('Transaction added successfully')
      setShowModal(false)

    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')

    }
  };


  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div><h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="181">Last 6 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />)}

        </div>
        <div><h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />)}

        </div>
        <div className='mx-2'>
          <UnorderedListOutlined className='mx-2' />
          <AreaChartOutlined className='mx-2' />
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>
      <div className='content'>
        <Table columns={columns} dataSource={allTransaction} />
      </div>
      <Modal title='Add Transaction' open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label='Amount' name="amount">
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Type' name="type">
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
              <Select.Option value='other'>Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name="category">
            <Select>
              <Select.Option value='Business'>Business</Select.Option>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='personal'>personal</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Reference' name='reference'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Date' name='date'>
            <Input type='date' />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            {/* <button className='btn btn-danger'>Cancel</button> */}
            <button type='submit' className='btn btn-primary'>{" "}Save</button>
          </div>
        </Form>
      </Modal>
    </Layout >
  )
}


export default HomePage;