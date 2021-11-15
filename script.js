const fs = require("fs");
const csv = require("csv-parser");

let users = [];
fs.createReadStream("./data.csv")
  .pipe(csv())
  .on("data", function (row) {
    const userName = row.first_name.toLowerCase();
    const passWord = `${userName.length}${userName}${userName.length}`;
    const user = {
      userName: userName,
      firstName: row.first_name,
      passWord: passWord,
      gender: row.gender,
    };

    users.push(user);
  })
  .on("end", function () {
    writeToCSV();
  });

// write user data to CSV
function writeToCSV() {
  fs.writeFile("./output.csv", createRows(), function (err) {
    if (err) {
      console.log(err.message);
    } else {
      console.log("saved");
    }
  });
}

// create rows for the CSV file using user data
function createRows() {
  const headers = ["S.No, Username, First Name, Password, Gender"];
  const rows = users.map((user, index) => {
    return `${index + 1}, ${user.userName}, ${user.firstName}, ${
      user.passWord
    }, ${user.gender}`;
  });

  return headers.concat(rows).join("\n");
}
