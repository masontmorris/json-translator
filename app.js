import translate from "translate";
import fs from "fs";
import inquirer from "inquirer";
import * as dotenv from "dotenv";
dotenv.config();

// userInputs();

// async function userInputs() {
//     const prompts = await inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "from",
//                 message: "What language are you translating from?",
//             },
//             {
//                 type: "input",
//                 name: "to",
//                 message: "What language are you translating to?",
//             },
//         ])
//         .then((answers) => {
//             translate.from = answers.from;
//             translate.to = answers.to;
//         });
// }

translate.from = "en";
translate.to = "es";

translate.key = process.env.GOOGLE_KEY;

const input = JSON.parse(fs.readFileSync("input/input.json"));
console.log(input);

const outputObj = {};

async function translateText() {
    for (var key in input) {
        const output = await translate(input[key].text, { from: translate.from, to: translate.to });
        console.log(output);
        outputObj[key] = output;
    }
    console.log(outputObj);
    fs.writeFileSync("output/output.json", JSON.stringify(outputObj));
}

translateText();
