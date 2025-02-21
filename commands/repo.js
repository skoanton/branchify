import inquirer from "inquirer";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";
dotenv.config();

export async function generateBranchName() {
  const { type, repoName } = await inquirer.prompt([
    {
      type: "input",
      name: "repoName",
      message: "Enter the name of the repository",
    },
    {
      type: "list",
      name: "type",
      message: "Select the type of branch",
      choices: ["feature", "bugfix", "hotfix"],
    },
  ]);

  const branchName = await createBranchName(type, repoName);

  console.log(`git checkout -b ${branchName}`);
}

async function getRepoBranches(repoName) {
  console.log("Getting repository...");
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const { data } = await octokit.repos.listBranches({
      owner: process.env.GITHUB_USERNAME,
      repo: repoName,
    });

    if (!data) {
      throw new Error("Repository not found");
    }
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}

async function createBranchName(type, repoName) {
  const branches = await getRepoBranches(repoName);

  const typeBranches = branches.filter((branch) => branch.name.includes(type));

  const number = String(typeBranches.length + 1).padStart(4, "0");

  const newBranchName = `${type}/${number}`;

  return newBranchName;
}
