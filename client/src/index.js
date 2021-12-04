import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import AppMainWindow from "./components/AppMainWindow"
import Welcome from "./views/Welcome"
import SessionViewer from "./views/SessionViewer"

ReactDOM.render(
  <React.StrictMode>
    <AppMainWindow>
      {window.location.pathname === "/" ? (
        <Welcome />
      ) : (
        <SessionViewer />
      )}
    </AppMainWindow>
  </React.StrictMode>,
  document.getElementById('root')
);
