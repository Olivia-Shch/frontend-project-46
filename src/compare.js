import _ from 'lodash';

const compareData = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value2: data2[key] ?? null }; // Если undefined → null
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value1: data1[key] ?? null }; // Если undefined → null
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: compareData(data1[key], data2[key]) };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'same', value: data1[key] ?? null }; // Если undefined → null
    }

    return {
      key, type: 'updated', value1: data1[key] ?? null, value2: data2[key] ?? null, // Если undefined → null
    };
  });
};

export default compareData;
