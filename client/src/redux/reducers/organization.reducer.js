import types from "../actions/action-types";

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_ALL_ORGANIZATIONS:
    case `${types.GET_ALL_ORGANIZATIONS}_REJECTED`:
      return {
        ...state,
        organizationResponse: action.updatePayload,
      };
    case types.GET_ORGANIZATION:
    case `${types.GET_ORGANIZATION}_REJECTED`:
      return {
        ...state,
        orgResponse: action.updatePayload,
      };
    case types.DELETE_ORGANIZATION_BY_ID:
    case `${types.DELETE_ORGANIZATION_BY_ID}_REJECTED`:
      return {
        ...state,
        organizationDeleteResponse: action.updatePayload,
      };
    case types.CREATE_ORGANIZATION:
    case `${types.CREATE_ORGANIZATION}_REJECTED`:
      return {
        ...state,
        organizationCreateResponse: action.updatePayload,
      };
    case types.UPDATE_ORGANIZATION:
    case `${types.UPDATE_ORGANIZATION}_REJECTED`:
      return {
        ...state,
        organizationUpdateResponse: action.updatePayload,
      };
    default:
      return state;
  }
};
