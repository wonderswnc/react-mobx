import React from 'react';
import { Layout } from 'antd';
import './Keep.less';
import styled from 'styled-components';

let { Header, Footer, Sider, Content } = Layout;

Footer = styled(Footer)`
  text-align: center;
`

class Keep extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <div className='icon'></div>
          <h2 className='keep-title'></h2>
        </Header>
        <Layout>
          <Sider></Sider>
          <Content></Content>
        </Layout>
        <Footer>Design by WonderwWNC at 2017/12/19</Footer>
      </Layout>
    )
  }
}

export default Keep;