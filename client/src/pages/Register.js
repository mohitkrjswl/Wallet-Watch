import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const submitHandler = async (values) => {
    try {
      setLoading(true)
      await axios.post('/users/register', values)
      message.success('Registration successfull')
      setLoading(false)
      navigate('/login')
    } catch (error) {
      setLoading(false)
      message.error('something went wrong')
    }
  }
  //  prevent for login user
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])
  return (
    <>
      <div className='register-page'>
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h2>Register form</h2>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type='email' />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' />
          </Form.Item>
          <div className='d-flex'>
            <Link to="/login">Already Register? Click here to login</Link></div>
          <button className='btn btn-primary'>Register</button>
        </Form>
      </div>

    </>
  )
}

export default Register