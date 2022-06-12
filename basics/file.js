const fs = require("fs"); // fs -> file system

const quote = "No beauty shines brighter than that of a good heart 😊 !!!.";

// file name - awesome.html

//fs.writeFile("./awesome.html", quote, (err) => {
//    console.log("Completed writing !!! 👍");
// });

//const quote2 = "Live more, worry less 😍😂";

/*for (let i = 1; i <= 10; i++) {
    fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
        console.log("Completed writing !!! 👍");
    });
}*/

/*console.log(process.argv);
const quote2 = "Live more, worry less 😍😂";
const noOfFiles = process.argv[2];

for (let i = 1; i <= noOfFiles; i++) {
    fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
        console.log("Completed writing !!! 👍", `text-${i}.html`);
    });
}*/

fs.readFile("./cool.txt", "utf8", (err, data) => {
    if(err) {
        console.log(" ❌ something went wrong", err);
    } else {
        console.log(data);
    }
    });

    const quote3 = "\nMake everday a little less ordinarily 😊";

    /*fs.writeFile("./nice.txt", quote3, (err) => {
        console.log("Completed writing !!! 👍");
    });*/

    fs.appendFile("./nice.txt", quote3, (err) => {
        console.log("Update file !!! 👍");
    });

    /*fs.unlink("./delete-file.css", (err) => {
        console.log("Delete file !!! 👍");
    });*/

    fs.unlink("./delete-file.css", (err) => {
        if(err) {
            console.log(" ❌ File does not exists");
        } else {
            console.log("Deleted file !!!!");
        }
        });