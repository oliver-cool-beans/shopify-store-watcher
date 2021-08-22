const fetch = require('node-fetch');
const { splitResponse } = require('../routes/discord/utils');

async function followUp (applicationId, token, data) {
    const splitData = splitResponse(data);
    
    for(var split in splitData){
        const payload = {
            content: `${splitData[split]} \n`
        }

        await fetch(`https://discord.com/api/webhooks/${applicationId}/${token}`, {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => console.log(json)); 
    }
}

module.exports = {
    followUp
}