import _ from 'lodash';

const addMargin = (depth, isSignMargin = false) => {
  const baseIndent = ' '.repeat(depth * 4);
  return isSignMargin ? baseIndent.slice(2) : baseIndent;
};

const makeString = (item, depth) => {
  if (!_.isObject(item) || item === null) {
    return String(item);
  }
  const string = Object.entries(item)
    .map(([key, value]) => `${addMargin(depth + 1)}${key}: ${makeString(value, depth + 1)}`);
  return `{\n${string.join('\n')}\n${addMargin(depth)}}`;
};

const makeTree = (comparedData, depth = 1) => {
  const data = comparedData.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${addMargin(depth)}${item.key}: ${makeTree(item.children, depth + 1)}`;
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

  return `{\n${data.join('\n')}\n${addMargin(depth - 1)}}`;
};

const makeStylishReportDiff = (comparedData) => makeTree(comparedData);

export default makeStylishReportDiff;

console.log(`addMargin(${depth}): ${baseIndent}`);
console.log(`makeString(${item}, ${depth}): ${result}`);

