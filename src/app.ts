import requestTranslation from './api/requestTranslation.js'

const translation = await requestTranslation('hello')

console.log(translation)
