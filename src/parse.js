import yaml from 'js-yaml';

const parse = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension: '${type}'!`);
  }
};

export default parse;
