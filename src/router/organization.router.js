const router = require("express").Router();
const organization = require("../controller/organization.controller");

// Create a new Organization
router.post("/", organization.createOrganization);

// Retrieve all Organization
router.get("/", organization.getAllOrganization);

// Retrieve Organization by id
router.get("/:id", organization.getOrganization);

// Update a Organization with object id
router.put("/:id", organization.updateOrganization);

// Delete Organization by id
router.delete("/:id", organization.deleteOrganization);

module.exports = router;
