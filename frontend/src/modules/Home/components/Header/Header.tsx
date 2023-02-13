import React from "react";
import { Layout, Button } from "antd";

import { useAuth } from "../../../providers/AuthProvider";
import { getUserFullName } from "../../../../utils/helpers";

import "./Header.css";

const { Header } = Layout;

const CustomHeader = () => {
  const { user, logout }: any = useAuth();
  return (
    <Header className="custom-header">
      {getUserFullName(user.user)}
      <Button
        onClick={logout}
        className="logout-button"
        type="primary"
        danger
        ghost
      >
        Logout
      </Button>
    </Header>
  );
};

export default CustomHeader;
