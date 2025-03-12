import makeStylishReportDiff from './stylish.js';
import makePlainReportDiff from './plain.js';
import makeJsonReportDiff from './json.js';

const makeReportDiff = (data, format) => {
  switch (format) {
    case 'stylish':
      return makeStylishReportDiff(data);
    case 'plain':
      return makePlainReportDiff(data);
    case 'json':
      return makeJsonReportDiff(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default makeReportDiff;
