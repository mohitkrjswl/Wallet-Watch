import React from 'react';
import { Card, Col, Row, Progress } from 'antd';
import '.././styles/Analytics.css';

const Analytics = ({ allTransaction }) => {
  const categories = ["business", "salary", "bills", "personal", "fee"];

  const totalTransaction = allTransaction.length;
  const totalIncome = allTransaction.filter(transaction => transaction.type === 'income');
  const totalExpense = allTransaction.filter(transaction => transaction.type === 'expense');
  const totalIncomePercent = (totalIncome.length / totalTransaction) * 100;
  const totalExpensePercent = (totalExpense.length / totalTransaction) * 100;

  const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <div className='analytics-container'>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card title="TOTAL TRANSACTION" bordered={false} className='analytics-wrapper'>
            <p>Total Transactions: {totalTransaction}</p>
            <p><span className='text-success'>Income: {totalIncome.length}</span> / <span className='text-danger'>Expense: {totalExpense.length}</span></p>
            <Row justify="center">
              <Col xs={12} sm={12} md={12} lg={12}>
                <Progress type='circle' size={80} strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Progress type='circle' size={80} strokeColor={'orange'} className='mx-2 mt-3' percent={totalExpensePercent.toFixed(0)} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card title="TOTAL TURNOVER" bordered={false} className='analytics-wrapper'>
            <p>Total Turnover: {totalTurnover}</p>
            <p><span className='text-success'>Income: {totalIncomeTurnover}</span> / <span className='text-danger'>Expense: {totalExpenseTurnover}</span></p>
            <Row justify="center">
              <Col xs={12} sm={12} md={12} lg={12}>

                <Progress type='circle' size={80} strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)} />

              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>

                <Progress type='circle' size={80} strokeColor={'orange'} className='mx-2 mt-3' percent={totalExpenseTurnoverPercent.toFixed(0)} />

              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card title="CATEGORY WISE INCOME" bordered={false} className='analytics-wrapper'>
            {categories.map(category => {
              const amount = allTransaction.filter(transaction => transaction.type === 'income' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div key={category} className='mb-3'>
                    <h5>{category}</h5>
                    <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                  </div>
                )
              );
            })}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card title="CATEGORY WISE EXPENSE" bordered={false} className='analytics-wrapper'>
            {categories.map(category => {
              const amount = allTransaction.filter(transaction => transaction.type === 'expense' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div key={category} className='mb-3'>
                    <h5>{category}</h5>
                    <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                  </div>
                )
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Analytics;
