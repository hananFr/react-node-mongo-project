   
export default function CardValid(
  idName,
  idDiscription,
  idAddress,
  idCategory,
) {
  let error = "";
  let data = {
    travelName: document.getElementById(idName).value,
    travelDescription: document.getElementById(idDiscription).value,
    travelAddress: document.getElementById(idAddress).value,
    travelCategory: document.getElementById(idCategory).value,
  };
  if (!data.travelName || data.travelName.length < 2) {
    error += `השם חייב להכיל שני תווים לפחות`;
  }

  if (!data.travelDescription || data.travelDescription.length < 2) {
    error += `תיאור הטיול חייב לכלול שני תווים לפחות!`;
  }
  if (!data.travelAddress || data.travelAddress.length < 2) {
    error += `הכתובת חייבת להכיל שני תווים לפחות`;
  }

  if (!data.travelCategory || data.travelCategory === 'בחר קטגוריה') {
    error += "אתה חייב לבחור קטגוריה!";
  }

  return error || data;
}

