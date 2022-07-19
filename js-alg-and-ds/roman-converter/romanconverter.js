function convertToRoman(num) {
    let numArr, roman = '';
  
    numArr = num.toString()
                .split('').reverse()
                .map((d, i) => Number(d) * Math.pow(10, i))
                .reverse();

    function append(times, char) {
        let k = 0, str = '';

        while (k < times) {
            str += char;
            k++;
        }

        return str;
    }
  
    for (let i = 0; i < numArr.length; i++) {
  
      if (numArr[i] >= 1000) {
        let j = numArr[i] / 1000;
        roman += append(j, 'M');
      } else if (numArr[i] === 900) {
        roman += 'CM';
      } else if (numArr[i] >= 500) {
        roman += 'D';
        let j = (numArr[i] - 500) / 100;
        roman += append(j, 'C');
      } else if (numArr[i] === 400) {
        roman += 'CD';
      } else if (numArr[i] >= 100) {
        let j = numArr[i] / 100;
        roman += append(j, 'C');
      } else if (numArr[i] === 90) {
        roman += 'XC';
      } else if (numArr[i] >= 50) {
        roman += 'L';
        let j = (numArr[i] - 50) / 10;
        roman += append(j, 'X');
      } else if (numArr[i] === 40) {
        roman += 'XL';
      } else if (numArr[i] >= 10) {
        let j = numArr[i] / 10;
        roman += append(j, 'X');
      } else if (numArr[i] === 9) {
        roman += 'IX';
      } else if (numArr[i] >= 5) {
        roman += 'V';
        let j = (numArr[i] - 5);
        roman += append(j, 'I');
      } else if (numArr[i] === 4) {
        roman += 'IV';
      } else if (numArr[i] >= 1) {
        roman += append(numArr[i], 'I');
      }
    }

    return roman;
  }
  
  convertToRoman(36);