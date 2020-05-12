const fs = require("fs");

let packageFile = JSON.parse(fs.readFileSync("../../package.json"));
packageFile.files = []
for(let f of fs.readdirSync("./dist")) {
    packageFile.files.push("ui/web/dist/" + f);
}
for(let f of fs.readdirSync("../../sounds")) {
    packageFile.files.push("sounds/" + f);
}
for(let f of fs.readdirSync("../../paks")) {
    packageFile.files.push("paks/" + f);
}
console.log(packageFile)
fs.writeFileSync("../../package.json", JSON.stringify(packageFile));