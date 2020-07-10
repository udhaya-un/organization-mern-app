/* eslint-disable no-empty */

const tempParam = [{ $match: { isDeleted: false } }];

/**
 * create document
 * @param schema
 * @param body
 */
exports.create = async (schema, body) => {
  try {
    return await schema.create(body);
  } catch (err) {
    return err;
  }
};

/**
 * get all documents
 * @param schema
 * @param params
 */
exports.findAll = async (schema, params = null, sort_value = null) => {
  try {
    if (params) {
      return await schema.find({
        $and: [
          params,
          { isDeleted: false }
        ]
      }).sort(sort_value);
    } else {
      return await schema.find({ isDeleted: false }).sort(sort_value);
    }

  } catch (err) { }
};


/**
 * get all documents
 * @param schema
 * @param lt
 * @param gt
 */
exports.findAllBySalary = async (schema, id=null, gt = null, lt = null) => {
  try {
      return await schema.find({$and:[{orgId:id},{salary:{
        $gte: gt,
        $lt: lt
      }}]});
  } catch (err) { }
};


/**
 * get documents
 * @param schema
 * @param params
 */
exports.findOne = async (schema, params) => {
  try {
    return await schema.findOne({
      $and: [
        params,
        { isDeleted: false }
      ]
    });
  } catch (err) { }
};

/**
 * Update document by id
 * @param schema
 * @param id
 * @param body
 */

exports.findOneAndUpdate = async (schema, id, body) => {
  try {
    const user = await schema.findByIdAndUpdate(
      id,
      { $set: body },
      { upsert: false, new: false, runValidators: true, context: "query" },
      function (err, result) {
        if (err) {
        } else {
          return result;
        }
      }
    );
    return user;
  } catch (err) { }
};
