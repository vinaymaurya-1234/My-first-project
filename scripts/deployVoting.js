const hre = require("hardhat");

async function main() {
    const Voting_Booth = await hre.ethers.getContractFactory("Voting_Booth");
    const voting = await Voting_Booth.deploy();

    await voting.waitForDeployment();

    console.log("Voting_Booth deployed to:",voting.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});