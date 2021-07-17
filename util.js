cleanPrice = (strPrice) => {
    if (strPrice == 'Free to Play')
        return 0
    slicedPrice = strPrice.split(" ")
    floatPrice = parseFloat(slicedPrice[1])
    return floatPrice
}

cleanString = (str) => {
    var cleanStr = ""
    for (var i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            cleanStr += str[i]
        }
    }
    return parseInt(cleanStr)
}


urlBuilder = (appId) => {
    return 'https://store.steampowered.com/app/' + appId
}

module.exports = { cleanPrice, urlBuilder, cleanString }