import React, {Component} from "react";
import "./App.css";
import ReportsPage from "./container/ReportsPage";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <ReportsPage />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
