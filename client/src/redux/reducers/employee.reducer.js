import types from "../actions/action-types";

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_ALL_EMPLOYEES:
    case `${types.GET_ALL_EMPLOYEES}_REJECTED`:
      return {
        ...state,
        employeeResponse: action.updatePayload,
      };
    case types.GET_ALL_EMPLOYEES_BY_ORG:
    case `${types.GET_ALL_EMPLOYEES_BY_ORG}_REJECTED`:
      return {
        ...state,
        employeeByOrgResponse: action.updatePayload,
      };
    case types.GET_EMPLOYEES_BY_SALARY:
    case `${types.GET_EMPLOYEES_BY_SALARY}_REJECTED`:
      return {
        ...state,
        empResponseBySalary: action.updatePayload,
      };
    case types.CREATE_EMPLOYEE:
    case `${types.CREATE_EMPLOYEE}_REJECTED`:
      return {
        ...state,
        createResponse: action.updatePayload,
      };
    case types.UPDATE_EMPLOYEE:
    case `${types.UPDATE_EMPLOYEE}_REJECTED`:
      return {
        ...state,
        updateResponse: action.updatePayload,
      };
    case types.DELETE_EMPLOYEE_BY_ID:
    case `${types.DELETE_EMPLOYEE_BY_ID}_REJECTED`:
      return {
        ...state,
        deleteResponse: action.updatePayload,
      };

    default:
      return state;
  }
};
