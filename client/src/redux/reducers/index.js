import { combineReducers } from 'redux';
import Organization from './organization.reducer';
import Employee from './employee.reducer';

const rootReducer = combineReducers({
  Organization,
  Employee,
});

export default rootReducer;
