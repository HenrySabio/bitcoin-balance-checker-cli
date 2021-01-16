const axios = require('axios');
// Takes in btc address as an argument
const walletAddr = process.argv[2];

// Defines api endpoint for address data lookup
const blockstream = `http://blockstream.info/api/address/${walletAddr}`;
const coindesk = `https://api.coindesk.com/v1/bpi/currentprice.json`;

const blockstreamRequest = axios.get(blockstream);
const coindeskRequest = axios.get(coindesk);
let blockstreamResponse,
    coindeskResponse;

axios.all([blockstreamRequest, coindeskRequest])
    .then(res => {
        blockstreamResponse = res[0].data.chain_stats;
        coindeskResponse = res[1].data.bpi["USD"].rate_float.toFixed(2);
    })
    .catch(errors => {
        console.log(errors);
    })
    .then(() => {
        const addrBalance = blockstreamResponse.funded_txo_sum - blockstreamResponse.spent_txo_sum;;
        console.log(addrBalance);
        console.log(coindeskResponse);
    })