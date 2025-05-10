import * as getYamlData from "./modules/getYamlData.js";
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', function(req, res) {
  res.send("ahoj ahoj");
})

app.get('/watch_list', function(req, res) {
  res.send(getYamlData.getData('./data/watch_list.yaml'));
})

app.get('/reading_list', function(req, res) {
  res.send(getYamlData.getData('./data/reading_list.yaml'));
})

let port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
