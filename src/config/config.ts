export interface AppConfig {
    rpc_url: string;
    wallet_address: string;
    token_address: string;
    native_symbol: string;
}

export const config: AppConfig = {
    rpc_url: "https://bsc-rpc.publicnode.com",
    wallet_address: "0xB265A4B2136F2C5343cbE8DCe74dBDCd8786aE1E",
    token_address: "0xe6DF05CE8C8301223373CF5B969AFCb1498c5528",
    native_symbol: "BNB"
};
