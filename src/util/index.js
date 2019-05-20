const LdapAuth = require('ldapauth-fork')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const pathname = path.resolve(__dirname, '../../.user')

function checkLogin () {
  if (!fs.existsSync(pathname)) {
    console.log('用户未登录')
    return false
  } else {
    return true
  }
}

exports.login = async function login (username, password) {
  const LdapConfig = {
    url: 'ldap://adldap.abcft.com/',
    bindDN: 'cn=aop,cn=Users,dc=niub,dc=la',
    bindCredentials: 'P@55word',
    searchBase: 'dc=niub,dc=la',
    searchFilter: '(sAMAccountName={{username}})',
    reconnect: true,
    timeout: 6000
  }
  const ldap = new LdapAuth(LdapConfig)
  ldap.on('connect', function (err) {
    console.error('LdapAuth: ', err);
  })
  return new Promise((resolve, reject) => {
    ldap.authenticate('ddxia.abcft', 'epW6cUPKZGOuYSyJEtZ', (err, user) => {
      console.log(111)
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(user)
        resolve(user)
      }
    })
  })
}

exports.getUserinfo = function getUserinfo () {
  if (checkLogin()) {
    return JSON.parse(fs.readFileSync(pathname))
  }
}

exports.report = async function report (data) {
  try {
    await axios.post('https://wdcp.analyst.ai/api/v1/action/log', data)
    console.log('上传成功')
  } catch (err) {
    console.log(err)
    console.log('发生了一个错误')
  }
}