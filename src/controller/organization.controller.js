const organizationService = require("../service/organization.service");

/**
 * create a organization
 * @param req
 * @param res
 * @posts
 **/
exports.createOrganization = async (req, res) => {
  const organization = await organizationService.createOrganization(req.body);
  res.status(organization.statusCode).json(organization);
};

/**
 * get all organization
 * @param req
 * @param res
 * @get
 */
exports.getAllOrganization = async (req, res) => {
  const organization = await organizationService.getAllOrganization();
  res.status(organization.statusCode).json(organization);
};

/**
 * get organization
 * @param req
 * @param res
 * @get
 */
exports.getOrganization = async (req, res) => {
  const organization = await organizationService.getOrganization(req.params.id);
  res.status(organization.statusCode).json(organization);
};

/**
 * update organization by object id
 * @param req
 * @param res
 * @put
 */
exports.updateOrganization = async (req, res) => {
  const organization = await organizationService.updateOrganization(req.params.id, req.body);
  res.status(organization.statusCode).json(organization);
};

/**
 * delete organization by object id
 * @param req
 * @param res
 * @delete
 */
exports.deleteOrganization = async (req, res) => {
  const organization = await organizationService.deleteOrganization(req.params.id);
  res.status(organization.statusCode).json(organization);
};
