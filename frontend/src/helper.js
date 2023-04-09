export const genresObject = (genresArray) => {
  return genresArray.reduce((acc, item) => {
    return {
      ...acc,
      [item._id]: item.name,
    };
  }, {});
};
