import { createRequire } from "module"; // add the ability to construct the'require' method in js file
const require = createRequire(import.meta.url); // construct the require method
const fs = require("fs"); //require file system methods