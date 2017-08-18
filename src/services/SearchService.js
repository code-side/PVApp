export const searchByNameAndProvince = (data, searchText, provinceName) => {
  let results = [];
  searchText = searchText.toLowerCase().trim();

  for (let item of data) {
    if (item.province.name === provinceName) {
      if (searchText.length === 0) {
        results.push(item);
      } else if (searchText.length > 0) {
        let keys = searchText.split(' ');
        let hasTextMatch = false;
        let i = 0;

        while (!hasTextMatch && i < keys.length) {
          let key = keys[i].trim();
          hasTextMatch = item.name.toLowerCase().includes(key) ||
          item.province.name.toLowerCase().includes(key);
          i++;
        }

        // If text conditions are true, add the item to result list
        if (hasTextMatch) {
          results.push(item);
        }
      }
    }
  }

  return results;
};

/**
  data: []
  propToCheck: '', object property path, sample: obj.propery.array[0].property
  value: '', value to check against propToCheck value
*/
export const filterByProperty = (data, propToCheck, value) => {
  let results = [];

  for (let item of data) {
    let propertyValue = propToCheck.split('.')
      .reduce((prev, curr) => {
          return prev ? prev[curr] : undefined;
      }, item);

    let valid = (propertyValue === value);

    if (valid) {
      results.push(item);
    }
  }

  return results;
};

export const sortByRating = (data) => {
  data.sort((arg1, arg2) => {
    let globalRating1 = 0;
    let globalRating2 = 0;

    arg1.reviews.forEach((r) => {globalRating1 += r.rating;});
    arg2.reviews.forEach((r) => {globalRating2 += r.rating;});

    return globalRating1 < globalRating2;
  });

  return data;
};
