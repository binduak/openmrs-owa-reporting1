import fileDownload from 'react-file-download';

const REPORT_FETCH_PENDING = 'REPORT_FETCH_PENDING';
const REPORT_FETCH_SUCCESS = 'REPORT_FETCH_SUCCESS';
const REPORT_FETCH_FAILED = 'REPORT_FETCH_FAILED';
const REPORT_DATA_PENDING = 'REPORT_DATA_PENDING';
const REPORT_DATA_SUCCESS = 'REPORT_DATA_SUCCESS';
const REPORT_DATA_FAILED = 'REPORT_DATA_FAILED';

const initialState = {
    isLoading: false,
    reportData: [],
    csvfile: ''
};

const fetchReportDefinition = () => {
    return (dispatch) => {
        dispatch({type: REPORT_FETCH_PENDING});
        return getReportDefinitionCall().then(data =>
            dispatch({type: REPORT_FETCH_SUCCESS, data})
        ).catch(data =>
            dispatch({type: REPORT_FETCH_FAILED, data})
        );
    }
};

const fetchReportData = (uuid, startDate, endDate) => {
    return (dispatch) => {
        dispatch({type: REPORT_DATA_PENDING});
        return getReportDataCall(uuid, startDate, endDate);
    }
};


const getReportDefinitionCall = async () => {
    const response = await fetch(`http://localhost:3000/openmrs/ws/rest/v1/reportingrest/reportDefinition`,
        {
            method: 'GET',
            credentials: 'include',
            header: {
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        }
    );
    const data = await response.json();
    console.log(data, 'data');
    return data;
};

const getReportDataCall = (uuid, startDate, endDate) => {
    fetch(`http://localhost:3000/openmrs/module/reporting/reports/run.form`, {
        method: 'GET',
        credentials: 'include',
    }).then((response) => {
        return response.blob();
    }).then((blob) => {
        fileDownload(blob, 'csvFile.zip')
    });
};


const reportPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPORT_FETCH_PENDING: {
            return Object.assign({}, state, {isLoading: true}, {reportData: {results: []}});
        }
        case REPORT_FETCH_SUCCESS: {
            return Object.assign({}, state, {isLoading: false}, {reportData: action.data});
        }
        case REPORT_FETCH_FAILED: {
            return Object.assign({}, state, {isLoading: false}, {reportData: action.data});
        }
        case REPORT_DATA_PENDING: {
            return Object.assign({}, state,)
        }
        case REPORT_DATA_SUCCESS: {
            return Object.assign({}, state);
        }
        case REPORT_DATA_FAILED: {
            return Object.assign({}, state);
        }
        default :
            return state;
    }
};

const reportsPageActions = {fetchReportDefinition, fetchReportData};

export {reportsPageActions, reportPageReducer};

