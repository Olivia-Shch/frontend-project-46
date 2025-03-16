import { readFileSync } from 'node:fs';
import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

const expectedStylish = readFile('expectedFileStylish.txt');
const expectedPlain = readFile('expectedFilePlain.txt');
const expectedJson = readFile('expectedFileJSON.txt');

const fileTypes = ['json', 'yaml', 'yml'];

describe('gendiff', () => {
  test.each(fileTypes)('should be work with %s', (fileType) => {
    const file1 = getFixturePath(`file1.${fileType}`);
    const file2 = getFixturePath(`file2.${fileType}`);
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
    expect(genDiff(file1, file2)).toEqual(expectedStylish);
  });
});