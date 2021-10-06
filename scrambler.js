import { createRequire } from "module"; // add the ability to construct the'require' method in js file
const require = createRequire(import.meta.url); // construct the require method
const fs = require("fs"); //require file system methods
const path = require("path"); //require path methods


function scrambleFiles(dir, ext) {
    let files = fs.readdirSync(dir); //read the directory
    let unscrambledFiles = [], unscrambledNames = [],scrambledNames = []; 


        for (let i = 0; i < files.length; i++) {
            if (path.extname(files[i]) === ext) {

                unscrambledFiles.push(files[i]); //save the original file to an array 
                unscrambledNames.push(`0${files[i]}`); // add a zero to the file name  so they don't get overwritten
            }
        }

        scrambledNames = unscrambledNames.slice(); // //make a copy of unscrambledNames

         //randomize all of the indexes in the scrambledNames array
        for (let i = 0; i < scrambledNames.length; i++) {
            let randomIndex = Math.floor(Math.random() * scrambledNames.length);
            [scrambledNames[i], scrambledNames[randomIndex]] = [scrambledNames[randomIndex], scrambledNames[i]];
        }

          //rename the actual files to randomized names with zeros in front so they don't get overwritten
        for (let i = 0; i < scrambledNames.length; i++) {
            fs.renameSync(
                path.join(
                        dir, unscrambledFiles[i]
                        ), 
                path.join(
                        dir, scrambledNames[i]
                        )
                );
        }
        //reename the actual file to the original names removing the zero
        for (let i = 0; i < scrambledNames.length; i++) {
            fs.renameSync(
                path.join(
                    dir, unscrambledNames[i]), 
                path.join(
                    dir, scrambledNames[i].slice(1)
                    )
                );
        }


        return scrambledNames
}   

scrambleFiles("./eggs", ".json");


