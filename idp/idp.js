const { runServer, userDefaults } = require('saml-idp')
require('dotenv').config()

console.log(process.env.ASCURL, process.env.AUDIENCE)
runServer({
  acsUrl: process.env.ASCURL,
  audience: process.env.AUDIENCE,
  config: {
    user: userDefaults,
    metadata: [
      {
        id: 'cn',
        optional: false,
        displayName: 'cn',
        description: 'cn',
        multiValue: false
      },
      {
        id: 'displayName',
        optional: false,
        displayName: 'displayName',
        description: 'displayName',
        multiValue: false
      },
      {
        id: 'eduPersonPrincipalName',
        optional: false,
        displayName: 'eduPersonPrincipalName',
        description: 'eduPersonPrincipalName',
        multiValue: false
      },
      {
        id: 'mail',
        optional: false,
        displayName: 'mail',
        description: 'mail',
        multiValue: false
      },
      {
        id: 'schacHomeOrganization',
        optional: false,
        displayName: 'schacHomeOrganization',
        description: 'schacHomeOrganization',
        multiValue: false
      },
      {
        id: 'schacPersonalUniqueCode',
        optional: false,
        displayName: 'schacPersonalUniqueCode',
        description: 'schacPersonalUniqueCode',
        multiValue: false
      }
    ],
    user: {
      userName: 'tepptest',
      cn: 'Teppo Testikäyttäjä',
      displayName: 'Teppo',
      eduPersonPrincipalName: 'teppo@yliopisto.fi',
      mail: 'teppohaka@mailinator.com',
      schacHomeOrganization: 'yliopisto.fi',
      schacPersonalUniqueCode: 'urn:schac:personalUniqueCode:fi:yliopisto.fi:x8734'
    }
  }
})