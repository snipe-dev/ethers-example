import { ethers } from "ethers";
import { config } from "./config/config.js";
import { erc20abi } from "./config/erc20abi.js";

const provider = new ethers.JsonRpcProvider(config.rpc_url);

function roundTo3(value: number): number {
    return Math.round(value * 1000) / 1000;
}

async function main(): Promise<void> {
    const nativeBalanceWei = await provider.getBalance(config.wallet_address);
    const nativeBalance = Number(ethers.formatEther(nativeBalanceWei));

    const tokenContract = new ethers.Contract(
        config.token_address,
        erc20abi,
        provider
    );

    const [rawTokenBalance, decimals, totalSupply, tokenSymbol] = await Promise.all([
        tokenContract.balanceOf(config.wallet_address),
        tokenContract.decimals(),
        tokenContract.totalSupply(),
        tokenContract.symbol()
    ]);

    const tokenBalanceNormalized = Number(
        ethers.formatUnits(rawTokenBalance, decimals)
    );

    const totalSupplyNormalized = Number(
        ethers.formatUnits(totalSupply, decimals)
    );

    const tokenPercent =
        totalSupplyNormalized === 0
            ? 0
            : (tokenBalanceNormalized / totalSupplyNormalized) * 100;

    console.log(`Wallet: ${config.wallet_address}`)
    console.log(`Native balance: ${roundTo3(nativeBalance)} ${config.native_symbol}`)
    console.log(`Token balance : ${roundTo3(tokenBalanceNormalized)} ${tokenSymbol} (${roundTo3(tokenPercent)}%)`)

}

main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
});
