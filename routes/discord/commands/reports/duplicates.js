const Shopify = require("shopify-api-node")

const shopify = new Shopify({
    shopName: process.env['SHOPIFY_SHOP_NAME'],
    apiKey: process.env['SHOPIFY_API_KEY'],
    password: process.env['SHOPIFY_API_PASSWORD']
});

const shopifyStoreUrl = `https://${process.env['SHOPIFY_SHOP_NAME']}/admin/products/`
const reportParams = ['sku', 'barcode'];

const parseProducts = (products) => {
    // Reduce products into an object by duplicates
    const data = products.reduce((obj, product) => {

    // Loop through each variant on a product to find duplicates
        reportParams.forEach((param) => {
            const variants = product.variants.map((variant) => {
                const variantParam = variant[param];
                if(!variant[param]) return;
                if(!obj[param]) obj[param] = {}
                variant.product_title = product.title;
                if(!obj[param][variantParam]) return obj[param][variantParam] = [variant]
                obj[param][variantParam].push(variant)
            })

        })
        return obj
    }, {})

    // Now parse the reults, and only return duplicate values. 
    const filteredData = Object.keys(data).reduce((obj, field) => {
            obj[field] = Object.keys(data[field]).reduce((dupObj, resourceId) => {
                    if(data[field][resourceId].length > 1)  {
                        dupObj[resourceId] = data[field][resourceId]
                    }
                return dupObj;
            }, {});
        return obj
    }, {});

    return filteredData;
}

const formatResponse = (data) => {
    let response = "📋 Shopify Duplicates 📋\n"
    Object.keys(data).forEach((field) => {
        response += `🔧**${field}**🔧\n`
          
        if(!Object.keys(data[field]).length) return response += "👍👍👍 No Duplicates Found 👍👍👍 \n"

        Object.keys(data[field]).forEach((param) => {
            response += `${param}, ${
                data[field][param].map((variant) => {
                    return `[${variant.product_title}](${shopifyStoreUrl + variant.product_id})`
                })
            }\n`
        })

    })

    return response
}

module.exports = async (data) => {
    let productData = [];
    let params = { limit: 250 };

    do{
        const products = await shopify.product.list(params).catch((error) => {
            console.error("Error getting shopify products:", error)
        });
        productData = productData.concat(products);

        params = products.nextPageParameters;
    } while( params );
    console.log(`** Duplicate Product Report ** Pulled ${productData.length} products`)

    productData = parseProducts(productData);

    return formatResponse(productData);
}