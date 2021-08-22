module.exports = (commandData) => {
    // Get top level command (eg 'shopify')
    if(commandData?.custom_id) {
        return {
            "name" : commandData.custom_id, 
            "value" : commandData?.values?.[0]
        }
    }
    const {options: command} = commandData;
    const commandName = command[0]?.name;
    // Get first option name (eg 'run')
    const commandOptions = command?.[0]?.options;
    const commandParam = commandOptions[0]?.name
    // Get value of command (eg 'duplicates')
    const commandParamOptions = commandOptions?.[0]?.options
    const commandValue= commandParamOptions?.[0]?.value
    
    return {
        name: commandName, 
        parameter: commandParam, 
        value: commandValue
    }
}