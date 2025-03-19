import _ from 'lodash';

const compareData = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return sortedKeys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);
    const value1 = hasKey1 ? data1[key] : null;
    const value2 = hasKey2 ? data2[key] : null;

    if (!hasKey1) {
      return { key, type: 'added', value: value2 };
    }

    if (!hasKey2) {
      return { key, type: 'deleted', value: value1 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: compareData(value1, value2) };
    }

    if (_.isEqual(value1, value2)) {
      return { key, type: 'same', value: value1 };
    }

    return { key, type: 'updated', value1, value2 };
  });
};

export default compareData;
