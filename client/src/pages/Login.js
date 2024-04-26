import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
import '../styles/LoginPage.css'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (values) => {
    try {
      setLoading(true)
      const { data } = await axios.post('/users/login', values)
      setLoading(false)
      message.success('Login successful')
      localStorage.setItem('user', JSON.stringify({ ...data.user, Password: '' }))
      navigate('/')
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
    <div className='login-page'>
      {loading && <Spinner />}
      <div className='row container'>
        <h1>Track My Wallet- walletWatch</h1>

        <div className='col-md-6 login-container' style={{ borderRadius: '10px 0 0 10px', overflow: 'hidden' }}>
          <img src="bg.jpg" alt="login.img" style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '10px 0 0 10px' }} />
        </div>

        <div className='col-md-4 login-form' style={{ borderRadius: '0 10px 10px 0', backgroundColor: '#f8f9fa', padding: '20px' }}>
          <Form layout="vertical" onFinish={submitHandler}>
            <h2>Login Form</h2>

            <Form.Item label="Email" name="email">
              <Input type='email' required />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password required />
            </Form.Item>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/register">Not a user? Click here to register</Link>
              <button className='btn btn-primary'>Login</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
