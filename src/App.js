import React, { useLayoutEffect } from 'react';
import MediaCard from './MediaCard';

const getRandomPointer = () => {
  return parseInt(Math.random() * 20);
}
const getRandomNum = (max) => {
  let val = parseInt(Math.random() * max);
  while (val === 0) {
    val = parseInt(Math.random() * max)
  }
  return val;
}
const getPow = (pow) => {
  return Math.pow(2, pow)
}
const hex2bin = (hex) => {
  return ('00' + (parseInt(hex, 16)).toString(2));
}
const random_hex = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return n.slice(0, 6);
};
const random_decimal = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
}
const xor = (a, b, n) => {
  let ans = "";
  for (let i = 0; i < n; i++) {
    if (a[i] == b[i])
      ans += "0";
    else
      ans += "1";
  }
  return ans;
}
const getRandomStr = (size) => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  let str = '';
  for (let index = 0; index < size; index++) {
    str += values[getRandomNum(values.length)]
  }
  return str;
}

const q1 = () => {
  let expNume = getRandomNum(14);
  let expResult = getPow(expNume);
  const Qnumber = 1;
  const RandomPointer1 = getRandomPointer();
  const RandomPointer2 = getRandomPointer();
  const numPoiners = expResult / 4;
  let q = `גודל בלוק הוא ${expResult} = ${expNume}^2 ומצביע הוא בגודל 4 בתים.
  ישנם ${RandomPointer1} מצביעים ישירים ו-${RandomPointer2} מצביעים עקיפים מסוג single indirect
  מהוא גודל הקובץ המקסימלי במערכת קבצים זו?  
  `;
  const answer = `(${RandomPointer1} + ${RandomPointer2} * ${numPoiners}) * ${expResult} = ` + ((RandomPointer1 + (RandomPointer2 * numPoiners)) * expResult);
  const result = {
    q: q,
    Qnumber: Qnumber,
    answer: answer,
  };
  return result;
}
const q2 = () => {
  const Qnumber = 2;
  const val1 = random_hex();
  const val2 = random_hex();
  const pri = random_hex();
  const binVal1 = hex2bin(val1);
  const binVal2 = hex2bin(val2);
  const binPri = hex2bin(pri);
  let q = `RAID4/RAID5
  גודל כל בלוק הוא בית אחד(8 ביטים)
  נניח שבלוק הנתונים הכיל 0x${val1} ושינו אותו ל-0x${val2}
  אם בלוק הזוגיות הכיל 0x${pri} מה הוא יכול אחרי השינוי בבלוק?
  `;

  let a = 0;
  let answer = ` hex(${val1}) = bin(${binVal1})    |    hex(${val2}) = bin(${binVal2})    |    hex(${pri}) = bin(${binPri})   |   
  ${binVal1} xor ${binVal2} = ${(a = xor('' + binVal1, '' + binVal2, Math.min(binVal1.length, binVal2.length)))}    |   
  ${binPri} xor ${a} = ${(a = xor('' + a, '' + binPri, Math.min(a.length, binPri.length)))}   |   
  `;
  let part1 = a.slice(0, 4);
  let part2 = a.slice(4, a.length);
  answer += `result = 0x${parseInt(part1, 2)}${parseInt(part2, 2)}`;
  const result = {
    q: q,
    Qnumber: Qnumber,
    answer: answer,
  };
  return result;
}
const q3 = () => {
  const Qnumber = 3;
  let expNume = getRandomNum(14);
  let expResult = getPow(expNume);
  const val1 = random_decimal();
  const binVal1 = hex2bin(val1);

  let str1 = '' + binVal1;
  let str2 = '' + binVal1;
  let str3 = '' + binVal1;
  let part1 = str1.slice(0, expNume);
  let part2 = str2.slice(expNume, expNume * 2);
  let part3 = str3.slice(expNume * 2, str3.length);

  let q = `בטבלת דפים עם 2 רמות ישנה טבלה עליונה של מצביעים לטבלאות ברמה השנייה
  גטדל כתובת הוא 32 ביטים
  הטבלה ברמה העליונה וכן כל האחת מהטבלאות ברמה השנייה מכילות ${expResult} = ${expNume}^2 שורות כל אחת,
  מהו המרחק offset בדף אם כתובת הנתון היא 0x${val1}
  `;


  let answer = `log_2(${expResult}) = ${expNume}   |   
  bin(${val1}) = ${binVal1}   |    
  offset = ${part3}   |   s = ${part2}   |   m-(s+offset) = ${part1}   |   
  offsetToDecimal(${part3}) = ${parseInt(part3, 2)}
  `;

  const result = {
    q: q,
    Qnumber: Qnumber,
    answer: answer,
  };
  return result;
}
const q4 = () => {
  const Qnumber = 4;
  const sizeBlock = 64;
  const logSizeBlock = 6;
  let expNume = getRandomNum(14);
  let expResult = getPow(expNume);
  const val1 = random_decimal();
  const binVal1 = hex2bin(val1);

  let str1 = '' + binVal1;
  let str2 = '' + binVal1;
  let str3 = '' + binVal1;
  const part1 = str1.slice(str1.length - logSizeBlock, str1.length);
  const part2 = str1.slice(str1.length - logSizeBlock - expNume, str1.length - logSizeBlock);
  const part3 = str1.slice(str1.length - logSizeBlock, str1.length);

  let q = `במטמון מיפוי ישיר ישנם ${expResult} = ${expNume}^2  בלוקים
  כל בלוק בגודל ${sizeBlock} = ${logSizeBlock}^2  בתים.
  נניח שהמעבד מבצע פקודה שקוראת נתון מכתובת 0X${val1}
  מהו מספר הבלוק שבו החומרה (MMU) תחפש את הנתון?`;


  let answer = `log_2(${expResult}) = ${expNume}   |   
  bin(${val1}) = ${binVal1}   |    
  offset = ${part1}    |    
  numBlockInBin = ${part2}   |   
  numBlockInNumber = ${parseInt(part2, 2)}
   `;

  const result = {
    q: q,
    Qnumber: Qnumber,
    answer: answer,
  };
  return result;
}

const App = () => {
  let Q = [];
  for (let index = 0; index < 10; index++) {
    Q.push(q1())
    Q.push(q2())
    Q.push(q3())
    Q.push(q4())
  }


  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '50px' }}>מבחנים תכנות מתקדם</h1>
      {Q.length > 0 && Q.map((q, index) => {
        return (<div key={index} style={{ marginTop: '20px' }}>
          <MediaCard q={q} index={index + 1} />
        </div>)
      })}
    </div>
  );
};

export default App;
