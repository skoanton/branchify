import { Command } from "commander";
import readline from "readline";

import slugify from "slugify";
const program = new Command();
import { generateBranchName } from "./commands/repo.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

program
  .command("new")
  .description("Skapa ett nytt Git branch-namn")
  .action(generateBranchName);

program.exitOverride();

const handleInput = async (input) => {
  const args = input.trim().split(" ");
  const [command, ...commandArgs] = args;

  try {
    await program.parseAsync([command, ...commandArgs], { from: "user" });
  } catch (error) {
    if (error.code === "commander.unknownCommand") {
      console.log("Unknown command. Type 'help' to see available commands.");
    }
  }

  promptCommand();
};

const promptCommand = () => {
  rl.question(`${"branchify>"}`, (input) => handleInput(input));
};

const main = () => {
  console.log(
    "Welcome to the Event Finder CLI! Type 'help' to see available commands."
  );
  promptCommand();
};

main();
