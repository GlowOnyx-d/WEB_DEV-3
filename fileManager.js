const fs = require("fs");

const fileName = "test.txt";

try {
    console.log("Creating File...");
    fs.writeFileSync(fileName, "Hello Node.js");
    console.log("File Created");
} catch (err) {
    console.log("Error creating file");
}

try {
    console.log("Reading File");
    let data = fs.readFileSync(fileName, "utf8");
    console.log(data);
} catch (err) {
    console.log("Error reading file");
}

try {
    fs.appendFileSync(fileName, "\nLearning FS Module");
    console.log("File Updated");
    let updatedData = fs.readFileSync(fileName, "utf8");
    console.log(updatedData);
} catch (err) {
    console.log("Error updating file");
}

try {
    fs.unlinkSync(fileName);
    console.log("File Deleted");
} catch (err) {
    console.log("Error deleting file");
}