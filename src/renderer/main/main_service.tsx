export const rules = {
  numeric: [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
  lowercase: [
    97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
  ],
  uppercase: [
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
    84, 85, 86, 87, 88, 89, 90,
  ],
  symbols: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
};

const decoder = (numArr: number[]) => {
  const textDecoder = new TextDecoder('utf-8');
  const bytes = new Uint8Array(numArr);
  return textDecoder.decode(bytes);
};

// this function will get arrays of unicode ranges and combine them in a single array, after that it will sort in crescent order : 0,1,2...
const implementRules = (rulesArray: number[][]) => {
  const response = rulesArray.pop();
  if (response === undefined) {
    return [];
  }

  rulesArray.forEach((arrayElement, index) => {
    if (index === rulesArray.length - 1) {
      return;
    }
    arrayElement.forEach((num) => response.push(num));
  });

  return response.sort((a, b) => {
    return a - b;
  });
};

export const generateRandomText = (
  passwordSize: number,
  ...rulesArray: number[][]
) => {
  const rulesUnicodes = implementRules(rulesArray);
  const max = rulesUnicodes[rulesUnicodes.length - 1];
  const min = rulesUnicodes[0];
  const arrayOfUnicodes: number[] = [];

  // this "for" will populate arrayOfUnicodes by the exaclty amount of passwordSize
  for (let i = passwordSize; i > 0; i -= 1) {
    // generate a random number between max and min and push t to arrayOfUnicodes
    arrayOfUnicodes.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return decoder(arrayOfUnicodes);
};
