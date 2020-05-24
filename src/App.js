import React from 'react';
import './App.css';
import GroceryApp from './components/GroceryApp';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="ant-layout-header app-header">Easy Grocery </Header>
        <Content className="app-content">
          <div className="app-component">
            <GroceryApp/>
          </div>
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
      
    </div>
  );
}

export default App;
