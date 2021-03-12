import data from "./data";

const objectGender = {};
const objectShirtSize = {};
const objectIncomeMonth = {};
data.forEach((element) => {
  objectGender[element.gender] = (objectGender[element.gender] || 0) + 1;
  objectShirtSize[element.shirtSize] =
    (objectShirtSize[element.shirtSize] || 0) + 1;
  objectIncomeMonth[element.incomeMonth] =
    (objectIncomeMonth[element.incomeMonth] || 0) + 1;
});

export { objectGender, objectShirtSize, objectIncomeMonth };
