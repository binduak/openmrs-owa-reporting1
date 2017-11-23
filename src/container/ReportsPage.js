import React, {Component} from "react";
import {connect} from "react-redux";
import {reportsPageActions} from "../ducks/reportsPageDuck";
import {bindActionCreators} from "redux";
import ReportList from "../component/ReportList";
import PropTypes from 'prop-types';


class ReportsPage extends Component {

    constructor() {
        super()
        this._onRunReport = this._onRunReport.bind(this);
    }

    componentWillMount() {
        this.props.actions.fetchReportDefinition();
    }

    render() {
        return (<ReportList data={this.props.reports} onRunReport={this._onRunReport}/>);
    }

    _onRunReport(uuid,startDate, endDate) {
        console.log(uuid,startDate, endDate,'uuid,startDate, endDate @ ReportsPage');
        console.log("In onRunReport");
        this.props.actions.fetchReportData(uuid,startDate, endDate);
    }
}



ReportsPage.PropTypes = {
    actions: PropTypes.shape({
        reportsPageActions: PropTypes.func.isRequired
    }),
    reports: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        reports: state.reports
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({...reportsPageActions}, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportsPage);

