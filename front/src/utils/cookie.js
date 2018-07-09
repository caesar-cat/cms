/* 设置cookie */
export function setCookie (cookieName, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = cookieName + '=' + escape(value) + '; expires=' + date.toGMTString()
}

/* 获取cookie */
export function getCookie (cookieName) {
  if (document.cookie.length > 0) {
    let cookieStart = document.cookie.indexOf(cookieName + '=')
    if (cookieStart !== -1) {
      cookieStart = cookieStart + cookieName.length + 1
      let cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) cookieEnd = document.cookie.length
      return unescape(document.cookie.substring(cookieStart, cookieEnd))
    }
  }
  return ''
}

/* 删除cookie */
export function delCookie (cookieName) {
  setCookie(cookieName, '', -1)
}