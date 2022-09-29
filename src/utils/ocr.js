import { getAccessToken, getIdCardOCR } from '@/api/ocr.js'

export async function getBaiDuAccessToken(params) {
  return await getAccessToken().then(res => res.access_token)
}

export async function idCardOCR(file) {
  const base64Image = await encodeImageFileAsURL(file)
  const noPrefixBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '')
  const access_token = await getBaiDuAccessToken()

  getIdCardOCR({ image: noPrefixBase64, id_card_side: 'front' }, access_token)
}

function encodeImageFileAsURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
