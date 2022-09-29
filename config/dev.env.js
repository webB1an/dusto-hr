'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '""',
  BASE_BAIDU_API: '"/baidu"',
  BAIDU_CLIENT_ID: '"UGvt6KOMb4L9WKi70n6d67r7"',
  BAIDU_CLIENT_SECRET: '"E9nMSgU7CTWcGFBRTgo5fXM1vMS6PnNR"',
  BAIDU_ACCESS_TOKEN_API: '"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=UGvt6KOMb4L9WKi70n6d67r7&client_secret=E9nMSgU7CTWcGFBRTgo5fXM1vMS6PnNR"',
  BAIDU_OCR_ID_CARD_API: '"https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token="',
  BAIDU_OCR_BANK_CARD_API: '"https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard?access_token="'
})
