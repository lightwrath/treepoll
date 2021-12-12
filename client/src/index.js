import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import AppMainWindow from "./components/AppMainWindow"
import Welcome from "./views/Welcome"
import Admin from "./views/Admin"
import SessionViewer from "./views/SessionViewer"

ReactDOM.render(
  <React.StrictMode>
    <AppMainWindow>
      <Router path={window.location.pathname} />
    </AppMainWindow>
  </React.StrictMode>,
  document.getElementById('root')
);

function Router({ path }) {
  if (path === "/") return (
    <Welcome />
  )
  if (path.split("/")[1] === "admin") return (
    <Admin />
  )
  return (
    <SessionViewer />
  )
}
