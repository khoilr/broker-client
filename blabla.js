const indicators = require('./src/data/indicator.json')

// rename key name to label in each indicator
const newIndicators = indicators.map(e => {
    // new attribute label in indicator
    const indicator = {
        ...e,
        label: e.name
    }
    delete indicator.name
    return indicator
})

// save newIndicators to JSON
const fs = require('fs')
fs.writeFile(
    './src/data/indicator.json',
    JSON.stringify(newIndicators),
    function (err) {
        if (err) throw err
        console.log('Saved!')
    }
)

console.log(newIndicators)
