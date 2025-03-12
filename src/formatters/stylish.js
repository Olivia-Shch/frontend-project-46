import _ from 'lodash';

const addMargin = (depth, fullMargin = false) => {
  if (fullMargin) {
    return _.repeat(' ', depth * 4 - 2);
  }
  return _.repeat(' ', depth * 4 - 0);
};

const makeString = (item, depth) => {
  if (!_.isObject(item) || item === null) {
    return String(item);
  }
  const string = Object.entries(item).map(([key, value]) => ` ${addMargin(depth + 1, true)} ${key}: ${makeString(value, depth + 1)}`);
  return `{\n${string.join('\n')}\n${addMargin(depth)}}`;
};

const makeTree = (comparedData, depth = 1) => {
  const data = comparedData.map((item) => {
    if (item.type === 'nested') {
      return `${addMargin(depth)}${item.key}: ${makeTree(item.children, depth + 1)}`;
    }
    if (item.type === 'deleted') {
      return `${addMargin(depth, true)}- ${item.key}: ${makeString(item.value1, depth)}`;
    }
    if (item.type === 'added') {
      return `${addMargin(depth, true)}+ ${item.key}: ${makeString(item.value2, depth)}`;
    }
    if (item.type === 'updated') {
      const string1 = `${addMargin(depth, true)}- ${item.key}: ${makeString(item.value1, depth)}`;
      const string2 = `${addMargin(depth, true)}+ ${item.key}: ${makeString(item.value2, depth)}`;
      return `${string1}\n${string2}`;
    }
    if (item.type === 'same') {
      return `${addMargin(depth)}${item.key}: ${makeString(item.value)}`;
    }
    return item;
  });
  return `{\n${data.join('\n')}\n${addMargin(depth - 1)}}`;
};

const makeStylishReportDiff = (comparedData) => makeTree(comparedData);

export default makeStylishReportDiff;
