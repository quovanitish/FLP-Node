const fs = require("fs");
const filepath = "./file.txt";

/*Sync */
// 1. Read file
if (fs.existsSync(filepath)) {
  const data = fs.readFileSync(filepath, "utf-8");
  console.log(data);
} else {
  console.log("Make sure to check file exists");
}

// 2. Write/append file
if (fs.existsSync(filepath)) {
  fs.writeFileSync(filepath, "\nDummy text", { flag: "a" });
} else {
  console.log("Make sure to check file exists");
}

// 3. Rename file
if (fs.existsSync(filepath)) {
  fs.renameSync(filepath, "test.txt");
} else {
  console.log("Make sure to check file exists");
}

// 4. Delete file
if (fs.existsSync(filepath)) {
  fs.unlinkSync(filepath, "test.txt");
} else {
  console.log("File not found");
}

/*Async */
// 1. Read file
fs.readFile(filepath, "utf-8", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data);
  }
});

// 2. Write/ append file
fs.writeFile(filepath, "\nNew data to be added/appended", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully written the data");
  }
});

fs.appendFile(filepath, "\nNew data to be added/appended", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully updated data");
  }
});

// 3. Rename file
fs.rename(filepath, "test.txt", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully renamed");
  }
});

// 4. Delete file
fs.unlink(filepath, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("File deleted successfully");
  }
});
