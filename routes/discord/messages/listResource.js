const commands = require('../commands');
const { titleCase } = require('../utils');

module.exports = (resource) => {
    const listData = Object.keys(commands[resource]).map((name, index) => {
        const item = commands[resource][name]
        return {
            label: titleCase(name), 
            value: name,
            description: item.description,
            emoji: item.emoji
        }
    })

    return {
        type: 4,
        data:{
            content: `Select from resource: ${resource}`,
            components: [
                {
                    type: 1, 
                    components: [
                        {
                        type: 3, 
                        custom_id: `${resource}`,
                        options: listData
                        }
                    ]
                }
            ]
        }
    }
}