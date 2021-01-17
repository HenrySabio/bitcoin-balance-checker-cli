// Import Node Dependencies 
const axios = require('axios');

// Takes in btc address as an argument
const walletAddr = process.argv[2];

// Defines api endpoint for address data & current conversion rate
const blockstream = `http://blockstream.info/api/address/${walletAddr}`;
const coindesk = `https://api.coindesk.com/v1/bpi/currentprice.json`;

if (walletAddr == undefined || walletAddr == null) {
    return console.log("\nPlease provide a bitcoin address.\n");
} else {
    // Create get requests
    const blockstreamRequest = axios.get(blockstream);
    const coindeskRequest = axios.get(coindesk);

    // Create request response variables
    let blockstreamResponse,
        coindeskResponse;

    // Begin api calls
    axios.all([blockstreamRequest, coindeskRequest])
        .then(res => {
            // Assign relevant data to response variables
            blockstreamResponse = res[0].data.chain_stats;
            coindeskResponse = res[1].data.bpi["USD"].rate_float.toFixed(2);
        })
        .catch(errors => {
            console.log(errors);
        })
        .then(() => {
            // Calculate address balance and currency conversation value 
            const satValue = blockstreamResponse.funded_txo_sum - blockstreamResponse.spent_txo_sum;
            const btcValue = satValue / 100000000;
            const fiatValue = btcValue * coindeskResponse;

            // Log final response to user
            console.log(`\nCurrent Address Balance:\n
    ${satValue} Satoshi
    ${btcValue} BTC`);

            console.log(`\nCurrent USD Value:\n
    $${fiatValue.toFixed(2)} at the current rate of $${coindeskResponse} per 1 BTC.`);

            console.log(`\nTo view detailed balance and transaction data please visit:\n
    https://blockstream.info/address/${walletAddr}\n`);
        })
}