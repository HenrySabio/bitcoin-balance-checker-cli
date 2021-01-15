const axios = require ('axios');
// Takes in btc address as an argument
const walletAddr = process.argv[2];

// Defines api endpoint for address data lookup
const url = `http://blockstream.info/api/address/${walletAddr}`;

// Makes request for address data
axios.get(url)
    .then(response => {
        const data = response.data.chain_stats
        // Takes total funds sent to address & subtracts spent funds to calculate remaining funds
        const addrBalance = data.funded_txo_sum - data.spent_txo_sum;

        // Logs remaining funds values in satoshis and btc
        console.log(`\nCurrent Address Balance:\n
    ${addrBalance} Satoshi
    ${addrBalance/(100000000)} BTC\n`);

        console.warn('Please note, this only reflects the balance of this specific address - NOT the entire wallet.\n')
    })
    .catch(err => {
        console.log(err);
    })
    .then(() => {
        // TODO: Get current BTC to USD value and return current estimated value of balance in USD.
    })