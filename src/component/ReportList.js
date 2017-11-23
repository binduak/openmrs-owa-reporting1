import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from 'prop-types';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";


export default class ReportList extends Component {
    constructor() {
        super();
        this.state = {
            startDate: '',
            endDate: '',
            format: ''
        };
        // this.selectFormat = this.selectFormat.bind(this);
        this.dayPickerStartDate = this.dayPickerStartDate.bind(this);
        this.dayPickerEndDate = this.dayPickerEndDate.bind(this);
        this.runButton = this.runButton.bind(this);
    }

    render() {
        const noDataText = this.props.data.isLoading ? 'Loading' : 'No Reports Configured';
        const options = {noDataText};
        return (
            <div className="col-sm-12 col-lg-12">
                <BootstrapTable data={this.props.data.reportData.results} options={options} striped condensed>
                    <TableHeaderColumn dataField='display' isKey>Name</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.dayPickerStartDate}> Start
                        Date</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.dayPickerEndDate}>End
                        Date</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.format} >
                        Format </TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.runButton}> </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }

    // selectFormat(event) {
    //     this.setState({format: event.target.value});
    // };

    dayPickerStartDate() {
        return (<input type="date" onChange={(event) => {

            this.setState({startDate: event.target.value})
        }
        }/>);
    };

    dayPickerEndDate() {
        return (<input type="date" onChange={(event) => this.setState({endDate: event.target.value})
        }/>);
    };

    format() {
        return (<lable>CSV</lable>);
    };

    runButton(cell, row, enumObject, rowIndex) {
        return (
            <button type="button"
                    onClick={() => this.props.onRunReport(row.uuid, this.state.startDate, this.state.endDate)}>Run
                Now</button> );
    };
}

ReportList.PropTypes = {
    reports: PropTypes.object,
    onRunReport: PropTypes.func.isRequired

};











