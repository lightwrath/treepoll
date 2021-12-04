import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import AppMainWindow from "./components/AppMainWindow"
import Welcome from "./views/Welcome"

ReactDOM.render(
  <React.StrictMode>
    <AppMainWindow>
      {window.location.pathname === "/" ? (
        <Welcome />
      ) : (
        <div>
          placeholder
        </div>
      )}
    </AppMainWindow>
  </React.StrictMode>,
  document.getElementById('root')
);
