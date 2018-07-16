module.exports = class Basic {
  packResult (code, msg, data, ...args) {
    return {
      code,
      msg,
      data
    }
  }
}