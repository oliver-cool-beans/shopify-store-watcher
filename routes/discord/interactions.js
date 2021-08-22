const commands = require('./commands');
const discord = require('../../services/discord');

const { listResource } = require('./messages');
const { resolveCommand } = require('./utils');

module.exports = async (req, res) => {
    // ACK Discord PING
    if(req.body.type == 1) return res.send({ "type" : 1 })

    const command = resolveCommand(req.body.data);

    if(command.parameter == "list"){
        console.log(`Listing Resource ${command.name}`);
        const data = listResource(command.name);
        return res.json(data);
    }
    
    const selectedCommand = commands[command.name][command.value];

    console.log(`Running ${command.name} ${command.value}`);

    if(selectedCommand.followUp) {
        res.json({ "type": 5});
    }

    const data = await selectedCommand.run(); 
    
    if(selectedCommand.followUp){
        return await discord.followUp(req.body.application_id, req.body.token, data);
    }
    
    return res.send(data);
}



///shopify reports run name:duplicates