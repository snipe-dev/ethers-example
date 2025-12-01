import { ethers } from 'ethers';
import { config } from "./config/config.js";
import { erc20abi } from "./config/erc20abi.js";

const provider = new ethers.JsonRpcProvider(config.rpc_url);

const tokenInterface = new ethers.Interface(erc20abi);

function getFunctionSelectors(iface: ethers.Interface): string[] {
    const selectors: string[] = [];
    iface.forEachFunction((func) => {
        selectors.push(func.selector);
    });
    return selectors;
}

async function multicall(
    calldata: [string, string][],
    provider: ethers.Provider
): Promise<[boolean, string][]> {
    try {
        const abi = ['function tryAggregate(bool,(address,bytes)[]) public view returns ((bool,bytes)[])'];
        const multicallContract = new ethers.Contract('0xcA11bde05977b3631167028862bE2a173976CA11', abi, provider);
        return await multicallContract['tryAggregate'](false, calldata);
    } catch {
        return [];
    }
}

async function main(): Promise<void> {
    const selectors: string[] = getFunctionSelectors(tokenInterface);
    console.log(selectors)
    const calldata: [string, string][] = [];

    // balanceOf(address owner)
    const balanceOfCalldata = ethers.concat([
        selectors[0],
        ethers.AbiCoder.defaultAbiCoder().encode(['address'], [config.wallet_address])
    ]);
    calldata.push([config.token_address, balanceOfCalldata]);
    // decimals(), symbol(), totalSupply()
    for (let i = 1; i < selectors.length; i++) {
        calldata.push([config.token_address, selectors[i]]);
    }

    const data = await multicall(calldata, provider);

    for (let i = 0; i < data.length; i++) {
        if (data[i][0]) { // success
            const funcName = tokenInterface.getFunctionName(selectors[i]);
            const decodedValue = tokenInterface.decodeFunctionResult(funcName, data[i][1]);
            console.log(funcName)
            console.log(decodedValue)
        }
    }

}

main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
});