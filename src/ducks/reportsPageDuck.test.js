import React from 'react';
import {reportReducer, reportsPageActions} from "./reportsPageDuck";


describe('reportsPageDuck tests', () => {

    // var React;
    // var TestUtils;
    // var TableHeaderColumn;
    //
    // beforeEach(function(){
    //     React = require('react/addons');
    //     TableHeaderColumn = require('../src/TableHeaderColumn.js');
    //     TestUtils = React.addons.TestUtils;
    // });

    it('return isLoading true when REPORT_FETCH_PENDING is dispatched', () => {
        const updatedState = reportReducer({isLoading: false, reportData: { results:[1,2,3]}}, { type: 'REPORT_FETCH_PENDING'});
        expect(updatedState).toEqual({isLoading: true, reportData: { results: []}});
    });

    it('should return pending while calling the fetchReportDefinition', () => {
        const identity = (a) => a;
        const action = reportsPageActions.fetchReportDefinition();
        const mockCallback = jest.fn();
        action(mockCallback);
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toEqual({type:'REPORT_FETCH_PENDING'});
    });
});

