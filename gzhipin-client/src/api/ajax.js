/*
    发送ajax请求的模型，返回一个promise对象
*/
import Axios from "axios";

export default function ajax(url, data = {}, type = 'GET') {
    if (type === 'GET') {
        let paramStr = '';
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&';
        });
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1);
        }
        return Axios.get(url + '?' + paramStr);
    } else {
        return Axios.post(url, data);
    }
}