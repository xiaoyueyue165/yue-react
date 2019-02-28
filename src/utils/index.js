/**
 * url 参数转对象
 *
 * @param {*} url
 * @returns
 */
function parseParam(url) {
    var paramArr = decodeURI(url).split("?")[1].split("&"),
        obj = {};
    for (var i = 0; i < paramArr.length; i++) {
        var item = paramArr[i];
        if (item.indexOf("=") != -1) {
            var tmp = item.split("=");
            obj[tmp[0]] = tmp[1];
        } else {
            obj[item] = true;
        }

    }
    return obj;

}


export default {
    parseParam
}