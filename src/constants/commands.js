const SFC = 'sfc';
const CC = 'cc';
const REDUCER = 'reducer';
const SETUP_STORE = 'setup-store';
const CONNECT = 'connect';

exports.SFC = SFC;
exports.CC = CC;
exports.REDUCER = REDUCER;
exports.SETUP_STORE = SETUP_STORE;
exports.CONNECT = CONNECT;

exports.COMMANDS = [SFC, CC, REDUCER, SETUP_STORE, CONNECT];
exports.REACT_COMMANDS = [SFC, CC, CONNECT];
exports.REDUX_COMMANDS = [REDUCER, SETUP_STORE, CONNECT];
