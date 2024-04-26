import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
import '../styles/Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const submitHandler = async (values) => {
    try {
      setLoading(true)
      await axios.post('/users/register', values)
      message.success('Registration successful')
      setLoading(false)
      navigate('/login')
    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')
    }
  }

  // Prevent login for already logged-in users
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className='register-page'>
      {loading && <Spinner />}
      <div className='register-container'>
        <div className='left-panel'>
          <img src="reg.jpg" alt="reg.img" />
          <div className='message'>
            <h1>Track My Wallet - WalletWatch</h1>
            <h5>Complete track of your <br></br>
              Expenses.</h5>
          </div>
        </div>
        <div className='right-panel'>
          <Form layout="vertical" onFinish={submitHandler}>
            <h2>Register form</h2>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type='email' />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <div className='login-link'>
              <Link to="/login">Already registered? Click here to login</Link>
            </div>
            <button className='btn btn-primary'>Register</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
