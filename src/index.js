import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import parse from './parse.js';
import compareData from './compare.js';
import makeReportDiff from './formatters/index.js';

const buildFullPathToFile = (file) => path.resolve(cwd(), file);

const extractFileFormat = (file) => path.extname(file).replace('.', '');

const readFile = (file) => {
  const filePath = buildFullPathToFile(file);
  const fileData = readFileSync(filePath, 'utf8');
  const data = parse(fileData, extractFileFormat(file));
  return data;
};

const genDiff = (file1, file2, formatter = 'stylish') => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const comparedData = compareData(data1, data2);
  const formattedData = makeReportDiff(comparedData, formatter);
  return formattedData;
};

export default genDiff;
