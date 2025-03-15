import _ from 'lodash';

const addMargin = (depth, isSignMargin = false) => {
  const spacesCount = depth * 4;
  return isSignMargin ? ' '.repeat(spacesCount - 2) : ' '.repeat(spacesCount);
};

const makeString = (item, depth) => {
  if (!_.isObject(item) || item === null) {
    return String(item);
  }
  const entries = Object.entries(item)
    .map(([key, value]) => `${addMargin(depth + 1)}${key}: ${makeString(value, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${addMargin(depth)}}`;
};

const makeTree = (comparedData, depth = 1) => {
  const data = comparedData.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${addMargin(depth)}${item.key}: {\n${makeTree(item.children, depth + 1)}\n${addMargin(depth)}}`;
      case 'deleted':
        return `${addMargin(depth, true)}- ${item.key}: ${makeString(item.value1, depth)}`;
      case 'added':
        return `${addMargin(depth, true)}+ ${item.key}: ${makeString(item.value2, depth)}`;
      case 'updated':
        return [
          `${addMargin(depth, true)}- ${item.key}: ${makeString(item.value1, depth)}`,
          `${addMargin(depth, true)}+ ${item.key}: ${makeString(item.value2, depth)}`
        ].join('\n');
      case 'same':
        return `${addMargin(depth)}${item.key}: ${makeString(item.value, depth)}`;
      default:
        throw new Error(`Unknown type: ${item.type}`);
    }
  });

  return data.join('\n');
};

const makeStylishReportDiff = (comparedData) => {
  console.log(JSON.stringify(comparedData, null, 2)); // Проверка структуры
  return `{\n${makeTree(comparedData)}\n}`;
};


export default makeStylishReportDiff;
