const paginate = async ({ page, take, model }) => {
  const skip = (page - 1) * take;

  const items = await model.find().limit(parseInt(take, 10)).skip(skip);

  const itemsCount = await model.countDocuments();
  const pageCount = Math.ceil(itemsCount / take);

  const pageMetaData = {
    page: parseInt(page, 10),
    take: parseInt(take, 10),
    itemsCount,
    pageCount,
    hasPreviousPage: page > 1,
    hasNextPage: page < pageCount,
  };

  return { items, pageMetaData };
};

module.exports = paginate;
