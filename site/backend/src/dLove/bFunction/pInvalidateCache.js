const invalidateCache = async (Model, nodeCache, keyArray, retrieveKey, name) => {
  let finalKeyArray = [...keyArray]

  const ids_retrieve = await Model.find({}).select("_id");

  ids_retrieve.forEach(each => {
    finalKeyArray.push(`${retrieveKey}-${each._id}`)
  });

  console.log(`${name} & Cache Deleted...`)

  return nodeCache.del(finalKeyArray);
};

module.exports = invalidateCache;