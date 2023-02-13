import React from "react";
import { Layout } from "antd";

import Header from "./components/Header/Header";

import { Outlet } from "react-router-dom";

const { Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Content className="home-container">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
