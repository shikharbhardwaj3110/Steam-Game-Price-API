const axios = require('axios')
const cheerio = require('cheerio')
const util = require('./util')

fetchSourceCode = async (appId) => {
    const url = util.urlBuilder(appId)
    const res = await axios.get(url, {
        headers: {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' },
            Cookie: "birthtime=568022321;"
        }
    })
    return res
}

getDetails = async (appId) => {
    const sourceCode = await fetchSourceCode(appId)
    const $ = cheerio.load(sourceCode.data)
    const gameTitle = $('[class=apphub_AppName]').text()
    if (gameTitle == "")
        return { error: 'Invalid appId entered' }
    const cleanedPrice = util.cleanString($('[itemprop=price]').attr('content')) || util.cleanString($('[class=discount_final_price]').contents()[0].data)
    const currencyCode = $('[itemprop=priceCurrency]').attr('content')
    const gameHeaderImage = $('[class=game_header_image_full]').attr('src')
    return { appId: appId, Title: gameTitle, currencyCode: currencyCode, price: cleanedPrice, gameHeaderImage: gameHeaderImage }
}

module.exports = { getDetails }