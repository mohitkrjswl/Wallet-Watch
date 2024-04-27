import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd';
import { EditOutlined, DeleteTwoTone } from '@ant-design/icons';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Spinner from '../components/Spinner';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [edit, setEdit] = useState(null);

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
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEdit(record)
            setShowModal(true)
          }} />
          <DeleteTwoTone className='mx-3' onClick={() => { handleDelete(record) }} />
        </div>
      )
    }
  ];

  // Function to fetch transactions
  const fetchTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('/transactions/gettransaction', { userid: user._id, frequency, selectedDate, type });
      setAllTransaction(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error('Fetch issue with transaction');
      setLoading(false);
    }
  };

  // Use effect to fetch transactions on initial load and when dependencies change
  useEffect(() => {
    fetchTransactions();
  }, [frequency, selectedDate, type]);

  // Function to handle delete transaction
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post('/transactions/deletetransaction', { transactionId: record._id });
      message.success('Transaction deleted successfully');
      fetchTransactions(); // Fetch transactions after delete
    } catch (error) {
      console.log(error);
      message.error('Unable to delete!');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (edit) {
        await axios.post('/transactions/edittransaction', {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: edit._id,
        });
        message.success('Transaction updated successfully');
      } else {
        await axios.post('/transactions/addtransaction', { ...values, userid: user._id });
        message.success('Transaction added successfully');
      }
      setShowModal(false);
      setEdit(null);
      fetchTransactions(); // Fetch transactions after add or update
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
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
        <div className='filter-tab'><h6 className='text-center'>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />)}
        </div>
        <div className='switch-icons'>
          <lord-icon
            src="https://cdn.lordicon.com/xljvqlng.json"
            trigger="hover" className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')}>
          </lord-icon>
          <lord-icon
            src="https://cdn.lordicon.com/zsaomnmb.json"
            trigger="hover"
            state="loop-all"
            colors="primary:#3080e8,secondary:#3080e8,tertiary:#3080e8,quaternary:#3a3347" className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')}>
          </lord-icon>
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>
      <div className='content' style={{ margin: '20px auto', maxWidth: '80%' }}>
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransaction} /> : <Analytics allTransaction={allTransaction} />}
      </div>
      <Modal title={edit ? 'Edit Transaction' : 'Add Transaction'} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout='vertical' onFinish={handleSubmit} initialValues={edit}>
          <Form.Item label='Amount' name="amount">
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Type' name="type">
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name="category">
            <Select>
              <Select.Option value='business'>Business</Select.Option>
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
            <button type='submit' className='btn btn-primary'>{" "}Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage;
