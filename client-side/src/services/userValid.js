const getElemVal = (id) => document.getElementById(id).value;

export default function validateSimpleRegistration(
  idEmail,
  idPassword,
  idName
) {
  let error = "";
  var data = {
    email: getElemVal(idEmail),
    password: getElemVal(idPassword),
    name: getElemVal(idName),
    admin: false,
  };

  if (!data.password || data.password.length < 6) {
    error = "Password must have 6 letters*";
  }

  if (data.email) {
    var reges =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var res = reges.test(data.email);
    if (!res) {
      error += "Must enter valid email*";
    }
  } else {
    error += "Must enter valid email*";
  }
  if (!data.name || data.name.length < 2) {
    error += "Name must have at leat two letters*";
  }

  return error || data;
}