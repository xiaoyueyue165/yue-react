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
/**
 * 按类型校验字符串
 *
 * @param {*} str
 * @param {*} type
 * @returns
 */
function checkType(str, type) {
    switch (type) {
        case 'empty':
            return (str == null || str == '' || str == undefined || typeof (str) == typeof (undefined));
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        /**
         * 校验邮政编码
         * @param {string} str 字符串
         * @return {bool}
         */
        case 'isZipCode':
            return /^(\d){6}$/.test(str);
        case 'isURL':
            return /^(https|http):\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'allChinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'hasChinese':
            return /^[\u4E00-\u9FA5]/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
// console.log((new Date(dateStr)).formate("yyyy-MM-dd"))
Date.prototype.formate = function (format) {
    const o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        S: this.getMilliseconds()
        // millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
        );
    }

    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
            );
        }
    }
    return format;
};

function parseCtime(str) {
    var temp = str;
    if (typeof temp === "string") {
        temp = Number(str) * 1000;
    }
    return new Date(temp).formate("yyyy-MM-dd");
}


function getDiffDays(endTime) {
    var curTime = new Date().getTime();

    // console.log(123456789456123,curTime);
    // console.log(123456789456123,endTime * 1000);

    var dates = Math.floor((endTime * 1000 - curTime)) / (1000 * 60 * 60 * 24);
    var days = Math.ceil(dates);
    return days;
}

/**
 *
 * 数组对象根据某属性排序
 * @param {*} props
 * @returns
 */
function sortBy(props) {
    return function (a, b) {
        return a[props] - b[props];
    }
}

function escape2Html (str) {
    if(!str){
        return '';
    }

    var arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };

    return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {

        return arrEntities[t];
    });
}

export default {
    parseParam,
    checkType,
    parseCtime,
    getDiffDays,
    escape2Html,
    sortBy
}