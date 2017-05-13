const numberWithCommas = x => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const buildCustomerInfo = state => {
  return {
    name: state.name.value,
    email: `${state.email.value}@${state.emailaddress.value}`,
    phonenumber: state.phonenumber.value,
    address: `${state.postcode.value} ${state.reg_address.value} ${state.address.value}`
  }
}

module.exports = {
  numberWithCommas,
  buildCustomerInfo
}
