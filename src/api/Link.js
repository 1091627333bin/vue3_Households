import service from "../utils/service.js"
let link = (url, method='get', data, params) => {
    return new Promise((resolve, reject) => {
        service.request({
            url, method, data, params
        }).then((ok) => {
            resolve(ok)
        }).catch((error) => {
            reject(error)
        })
    })
}
export default link