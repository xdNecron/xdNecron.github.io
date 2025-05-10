import YAML from 'yaml';
import { readFile, readFileSync } from 'fs';

function getData(url) {
  const raw_data = readFileSync(url, 'utf8');
  const data = YAML.parse(raw_data);
  return data;
}

export {
  getData
};
