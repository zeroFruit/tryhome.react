const emailValidation = (email) => {
  if (email === '') {
    return false;
  }
  return true;
}

const phonenumValidation = (pnum) => {
  if (pnum === '') {
    return false;
  }
  return true;
}

const regAddressValidation = reg_address => {
  if (reg_address.toString().indexOf("강남구") === -1) {
    return false;
  }
  return true;
}

module.exports = {
  emailValidation,
  phonenumValidation,
  regAddressValidation
}
