import React, { useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import Layout from '../components/Layout/Layout'

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)

  // form handling 
  const handleSubmit = (values) => {
    console.log(values)
  }


  return (
    <Layout>
      <div className='filters'>
        <div>range filters</div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>
      <div className='content'></div>
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

export default HomePage