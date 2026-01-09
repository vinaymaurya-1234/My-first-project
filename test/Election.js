const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Election_Poll",function(){

    let Voting_Booth;
    let voting;
    let owner,user1,user2;

   beforeEach(async function (){

    Voting_Booth = await ethers.getContractFactory("Voting_Booth");
    [owner,user1,user2] = await ethers.getSigners();
    voting = await Voting_Booth.deploy();
   });
   
   it("should start with zero votes", async function () {
        expect(await voting.modiVotes()).to.equal(0n);
        expect(await voting.rahulVotes()).to.equal(0n);
   });

   it("allow user to vote modi", async function () {
        await voting.connect(user1).voteModi();

        expect(await voting.modiVotes()).to.equal(1n);
        expect(await voting.voted(user1.address)).to.equal(true);
   });

   it("emit event when user vote modi",async function () {
          await expect(voting.connect(user1).voteModi()).to.emit(voting,"Voted").withArgs(user1.address,"Modi");
   });

   it("allow users to vote rahul", async function () {
        await voting.connect(user1).voteRahul();

        expect(await voting.rahulVotes()).to.equal(1n);
        expect(await voting.voted(user1.address)).to.equal(true);
   });

   it("emit event when user vote rahul",async function () {
          await expect(voting.connect(user1).voteRahul()).to.emit(voting,"Voted").withArgs(user1.address,"Rahul");
   });

   it("Same user cant vote multiple times", async function () {
        await voting.connect(user1).voteModi();

        await expect(voting.connect(user1).voteModi()).to.be.revertedWith("Already Voted!");
   });

   it("Same user cannot vote another candidate", async function () {
        await voting.connect(user1).voteModi();

        await expect(voting.connect(user1).voteRahul()).to.be.revertedWith("Already Voted!");
       });

   it("Different user can vote",async function () {
        await voting.connect(user1).voteModi();
        await voting.connect(user2).voteRahul();

        expect(await voting.modiVotes()).to.equal(1n);
        expect(await voting.rahulVotes()).to.equal(1n);
   });

   it("Track the votes",async function () {
        await voting.connect(user1).voteModi();

        expect(await voting.voted(user1.address)).to.equal(true);
        expect(await voting.voted(user2.address)).to.equal(false);
   });

   it("total votes of particular parties",async function () {
        await voting.connect(user1).voteModi();
        await voting.connect(user2).voteRahul();

        const results = await voting.getResults();

        expect(results[0]).to.equal(1n);
        expect(results[1]).to.equal(1n);
   });

   it("no vote return zero",async function () {

        const results = await voting.getResults();

        expect(results[0]).to.equal(0n);
        expect(results[1]).to.equal(0n);
   });

   it("only one person vote",async function () {
        await voting.connect(user1).voteModi();

        const results = await voting.getResults();

        expect(results[0]).to.equal(1n);
        expect(results[1]).to.equal(0n);
   });


});