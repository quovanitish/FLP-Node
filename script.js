const http = require("http");
const fs = require("fs");
const port = 3000;

// get file data in sync
const getFileData = () => {
  const data = fs.readFileSync("./data.json", "utf-8");
  return data.toString();
};

// Create server using http module
const server = http.createServer((req, res) => {
  if (req.url === "/users") {
    const fileData = getFileData();
    console.log(fileData);
    res.write(fileData);
  } else {
    const endPoints = req.url.split("/");
    const endPoint = endPoints[endPoints.length - 1];
    const fileData = getFileData();
    const objData = JSON.parse(fileData);
    for (let i = 0; i < objData.length; i++) {
      if (i == endPoint - 1) {
        res.write(JSON.stringify(objData[i]));
        console.log(objData[i]);
        res.end()
      } 
    }
  }
});

// Started server on PORT: 3000
server.listen(port, (error) => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Server is listening on port: ${port}`);
  }
});
