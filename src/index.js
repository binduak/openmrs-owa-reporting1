import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";


const store = configureStore();

// ReactDOM.render(<ReportList data={data} />, document.getElementById('root'));
ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
