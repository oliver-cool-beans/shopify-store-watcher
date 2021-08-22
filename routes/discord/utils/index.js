const e = require('express');

module.exports = {
    resolveCommand: require('./resolveCommand'),
    titleCase: (string) => {
        return string.split("_")
            .filter(x => x.length > 0)
            .map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
            .join(" ");
        },
    splitResponse: (string, splitChar) => {
        var data = string.split('\n');
        const dataArray = [];

        data.forEach((split) => {
            const selector = dataArray.length > 0 ?  dataArray.length - 1 : 0;
            const arrayStringLength = dataArray[selector]?.length || 0;
            if(arrayStringLength + split.length <= 2000){

                dataArray[selector] = dataArray[selector] ? dataArray[selector] + `${split} \n` : `${split} \n`;
            }else{
                dataArray.push(`${split} \n`);
            }
        });
        return dataArray;
    }
}