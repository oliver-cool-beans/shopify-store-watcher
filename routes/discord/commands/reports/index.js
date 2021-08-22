// Define shopify reports here.

module.exports = {
    duplicates: {
        run: require('./duplicates'),
        description: "List all duplicate products",
        followUp: true
    }
}