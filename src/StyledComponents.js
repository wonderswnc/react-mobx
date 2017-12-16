import React from 'react';
import { Layout } from 'antd';
import { observable } from 'mobx';
import styled from 'styled-components';

let { Header, Content, Footer, Sider } = Layout;

const MyHeader = styled(Header)`
  padding: 0px;
  background-color: rgba(0, 0, 0, .1)
`

const Logo = styled.div`
  background-color: #eee;
  width: 150px;
  line-height: 40px;
  margin-top: 12px;
  border-radius: 3px;
  display: inline-block;
  text-align: center;
`

class AntdComponent extends React.Component {

  static fetch = () => {
    console.log(123);
  }

  render() {

    console.log(this);

    return (
       <div>
        <Layout>
          <MyHeader className="123">
            <Logo onClick={toString}>
            </Logo>
          </MyHeader>
          <Layout>
            <Sider> sider </Sider>
            <Content> content </Content>
          </Layout>
          <Footer> base on ©2017 </Footer>
          <Footer></Footer>
        </Layout>
       </div>
    )
  }
}

export default AntdComponent;
