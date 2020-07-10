const organization = require("../model/organization.model");
const baseDao = require("../dao/base.dao");
const response = require("../utils/response");
const empolyee_service = require('./employee.service')

exports.createOrganization = async (body) => {
  let resut = await baseDao.create(organization, body);
  if (!resut) {
    return response.badRequest();
  }
  return response.success(resut);
};

exports.getAllOrganization = async () => {
  let resut = await baseDao.findAll(organization);
  if (!resut) {
    return response.error();
  }
  return response.success(resut);
};

exports.getOrganization = async (id) => {
  let resut = await baseDao.findOne(organization, params={_id:id});
  if (!resut) {
    return response.error();
  }
  return response.success(resut);
};

exports.updateOrganization = async (id, body) => {
  let resut = await baseDao.findOneAndUpdate(organization, id, body);
  if (!resut) {
    return response.notFound();
  }
  return response.success(resut);
};

exports.deleteOrganization = async (id) => {
  const body = { isDeleted: true };
  let resut = await baseDao.findOneAndUpdate(organization, id, body);
  if (!resut) {
    return response.notFound();
  }
  return response.deleted();
};
