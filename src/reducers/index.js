import {combineReducers} from "redux";
import {reportPageReducer as reports} from "../ducks/reportsPageDuck";

const rootReducer = combineReducers({
    reports
});

export default rootReducer;