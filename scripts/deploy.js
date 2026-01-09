

async function main() {
    const [admin] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    let hash = token.deploymentTransaction().hash;
    console.log(hash);

    const address = await token.getAddress();

    console.log("Token deployed",address);
}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
});