
// Fetch yaml file
fetch("../data/test.json")
  .then(text => text.text())
  .then(yaml => {
    console.log(yaml);
  });
