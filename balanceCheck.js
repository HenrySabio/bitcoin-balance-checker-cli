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
        console.log(`This address contains ${addrBalance} satoshis.`);
        console.log(`This is equal to ${addrBalance/(100000000)} btc.`);
    })
    .catch(err => {
        console.log(err);
    });