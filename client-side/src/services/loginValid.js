

export default function validateSignIn(idEmail, idPassword) {
  let error = "";
  var data = {
    email: idEmail,
    password: idPassword,
  };

  if (data.password) {
    var reges = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[#!*@$%^&()\-_]+)[A-Za-z\d#!*@$%^&()]{8,20}$/
    let res = reges.test(data.password);
    if (!res) error += 'הסיסמא חייבת להיות בין 8 ל20 תווים וכן היא חייבת לכלול לפחות אות אחת גדולה באנגלית 2 אותיות קטנות וסימן אחד.'
  }
  else {
    error += 'הסיסמא חייבת להיות בין 8 ל20 תווים וכן היא חייבת לכלול לפחות אות אחת גדולה באנגלית 2 אותיות קטנות וסימן אחד.'
  }

  if (data.email) {
    var reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var response = reg.test(data.email);
    if (!response) {
      error += "נא הכנס אימייל תקני *";
    }
  } else {
    error += "נא הכנס אימייל תקני   *";
  }

  return error || data;
}