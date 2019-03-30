const LdapAuth = require('ldapauth-fork')

const LdapConfig = {
  url: 'ldap://adldap.abcft.com/',
  bindDN: 'cn=aop,cn=Users,dc=niub,dc=la',
  bindCredentials: 'P@55word',
  searchBase: 'dc=niub,dc=la',
  searchFilter: '(sAMAccountName={{username}})',
  reconnect: true,
  timeout: 6000,
}


exports.checkLogin = function checkLogin () {
  
}

exports.login = async function login (username, password) {
  const ldap = new LdapAuth(LdapConfig)
  return new Promise((resolve, reject) => {
    ldap.authenticate(username, password, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
}