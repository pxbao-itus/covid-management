module.exports = {
  ifStr(s1, s2, options) {
    return s1 == s2 ? options.fn(this) : options.inverse(this);
  },

  inc(value, options) {
    return parseInt(value) + 1;
  },
  formatCurrency(value) {
    value = parseInt(value);
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  },
  formatPhoneNumber(value) {
    var phoneNumber = value.substring(0, 4);
    phoneNumber += " ";
    phoneNumber += value.substring(4, 7);
    phoneNumber += " ";
    phoneNumber += value.substring(7, 10);
    return phoneNumber;
  },
  formatDOB(value) {
    var dd = String(value.getDate()).padStart(2, "0");
    var mm = String(value.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = value.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  },
  formatTime(value) {
    return value.toLocaleString("vi");
  },
  ifNth(a, b, options) {
    var isNth = utils.isNumber(a) && utils.isNumber(b) && b % a === 0;
    return util.value(isNth, this, options);
  }
};
