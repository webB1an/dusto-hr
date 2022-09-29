import request from '@/utils/request'

export function getAccessToken() {
  return request({
    url: `${process.env.BASE_BAIDU_API}/oauth/2.0/token?grant_type=client_credentials&client_id=${process.env.BAIDU_CLIENT_ID}&client_secret=${process.env.BAIDU_CLIENT_SECRET}`,
    method: 'post'
  })
}

export function getIdCardOCR(data, access_token) {
  return request({
    url: `${process.env.BASE_BAIDU_API}/rest/2.0/ocr/v1/idcard?access_token=${access_token}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function(oldData) {
        // console.log(oldData)
        let newStr = ''
        for (const item in oldData) {
          newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
        }
        newStr = newStr.slice(0, -1)
        return newStr
      }
    ],
    data
  })
}
