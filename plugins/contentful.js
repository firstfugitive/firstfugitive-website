const contentful = require('contentful')

const config = {
  space: 'dbcppdxw8bib',
  accessToken: process.env.CTF_PREVIEW ? 'uR_RGqNf--03pw4258mhYMmP2U1-XFHpKCdv8_yvnbM' : 'XIOUq8XaCeuhXgblbO1DA2mgHX-uo1bAseK-FZ6jqJQ',/* preview, cdn */
  host: process.env.CTF_PREVIEW ? 'preview.contentful.com' : 'cdn.contentful.com',
  environment: 'master'
}

module.exports = {
  createClient () {
    return contentful.createClient(config)
  }
}
