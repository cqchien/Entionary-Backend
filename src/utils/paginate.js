// const orderConstant = require('../constant/sort');

// // Format sort
// // sortBy  = 'name:DESC,day:asc'
// // result: '-name day'
// const formatSort = (sortBy) => {
//   let sort = '';
//   if (sortBy) {
//     // ["name:DESC", "day:asc"]
//     const sortingCriteria = sortBy.split(',').map((sortOption) => {
//       // result: ["name": "DESC"]
//       // assign key: "name"
//       // assign order: "DESC"
//       const [key, order] = sortOption.split(':');
//       const signature = order === orderConstant.DESC ? '-' : '';
//       // return '-name'
//       return signature + key;
//     });
//     sort = sortingCriteria.join(' ');
//   } else {
//     sort = 'createdAt';
//   }
//   return sort;
// };

// plugin for mongoose schema
// Plugins are a tool for reusing logic in multiple schemas.
// Suppose you have several models in your database and want to add a paginate property to each one.
// Just create a plugin once and apply it to each Schema:
const paginate = async (schema) => {
  // add static functions to your model.
  // sort format: (name:DESC,day:asc)
  // use peer function (mustn't use arrow function) to call this in function.
  // eslint-disable-next-line no-param-reassign
  schema.statics.paginate = async function ({
    page, take, sortBy, population, queryOptions,
  }) {
    // format sort to fit with params for .sort(params) in mongoose
    // params format: '-name day'. It means: name:DESC and day:asc.
    // - means DESC
    // '' means acs
    // const sort = formatSort(sortBy);

    // if sorBy = {name: 'asc', day: 'desc'}, you dont need to format.
    const sort = sortBy || { createdAt: 'desc' };

    let docsFindPromise;
    const pageQuery = parseInt(page, 10);
    const limit = parseInt(take, 10);
    const skip = (pageQuery - 1) * limit;

    if (take && page) {
      docsFindPromise = this.find({ ...queryOptions })
        .sort(sort)
        .limit(limit)
        .skip(skip);
    } else {
      docsFindPromise = this.find({ ...queryOptions });
    }

    const docsCountPromise = this.countDocuments({ ...queryOptions }).exec();

    // handle populate
    // example data: 'topic , word'
    // data to populate:
    if (population) {
      population.split(',').forEach((populateOption) => {
        docsFindPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }), null),
        );
      });
    }

    const [docsCount, docs] = await Promise.all([docsCountPromise, docsFindPromise]);

    const pageCount = Math.ceil(docsCount / limit);

    const paginationMetaData = {
      page: pageQuery,
      take: limit,
      docsCount,
      pageCount,
      hasPreviousPage: pageQuery > 1,
      hasNextPage: pageQuery < pageCount,
    };

    return { docs, paginationMetaData };
  };
};

module.exports = paginate;
