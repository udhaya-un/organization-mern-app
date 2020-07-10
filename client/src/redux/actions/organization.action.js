import axiosCall from "./index";
import types from "./action-types";
import URL from "../../config/routes";
import { standardDate } from "../../utils/utils";

export const getAllOrganizations = () => {
  const path = URL.GET_ALL_ORGANIZATIONS;
  const responseType = types.GET_ALL_ORGANIZATIONS;
  return axiosCall("get", path, responseType);
};

export const saveOrganization = (data) => {
  const path = URL.GET_ALL_ORGANIZATIONS;
  const responseType = types.CREATE_ORGANIZATION;
  return axiosCall("post", path, responseType, data);
};

export const updateOrganization = (data) => {
  data.endDate = standardDate(data.endDate);
  data.startDate = standardDate(data.startDate);
  const path = `${URL.GET_ALL_ORGANIZATIONS}/${data.id}`;
  const responseType = types.UPDATE_ORGANIZATION;
  return axiosCall("put", path, responseType, data);
};

export const deleteOrganization = (id) => {
  const path = `${URL.GET_ALL_ORGANIZATIONS}/${id}`;
  const responseType = types.DELETE_ORGANIZATION_BY_ID;
  return axiosCall("delete", path, responseType);
};

export const getOrganization = (id) => {
  const path = `${URL.GET_ALL_ORGANIZATIONS}/${id}`;
  const responseType = types.GET_ORGANIZATION;
  return axiosCall("get", path, responseType);
};
