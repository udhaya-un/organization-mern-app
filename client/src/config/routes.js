export const BASE_URL = "http://localhost:5000/api/v1/";

export default {
  // Auth based routes
  LOGIN: `${BASE_URL}auth/login`,
  SIGN_UP: `${BASE_URL}auth/signup`,

  // Organization based routes
  GET_ALL_ORGANIZATIONS: `${BASE_URL}organization`,

  // Employee based routes
  GET_ALL_EMPLOYEES: `${BASE_URL}employee`,
};
