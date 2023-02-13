import React from "react";
import logo from "./logo.svg";
import "./App.css";
import routes from "./routes";
import "antd/dist/antd.css";
import { AuthProvider } from "./modules/providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className="App">{routes()}</div>
    </AuthProvider>
  );
}

export default App;
