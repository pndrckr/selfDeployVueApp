/* eslint-disable no-console */
import {execa} from 'execa';
import fs from "fs";

(async () => {
const branch = 'build'
    try {
    // await execa("git", ["checkout", "--orphan", "gh-pages"]);
    await execa("git", ["checkout", "--orphan", branch]);
    // eslint-disable-next-line no-console
    console.log("Building started...");
    await execa("npm", ["run", "build"]);
    // await execa("yarn", ["build"]);
    // Understand if it's dist or build folder
    // const folderName = fs.existsSync("dist") ? "dist" : "build";
    const folderName = "dist";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", branch]);
    console.log("Pushing to "+branch+"...");
    await execa("git", ["push", "origin", `HEAD:${branch}`, "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "main"]);
    await execa("git", ["branch", "-D", branch]);
    console.log("Successfully deployed, check your settings");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();