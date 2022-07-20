function checkCashRegister(price, cash, cid) {
  let change,
      avail;

  change = (cash - price) * 100;
  avail = cid.reduce((sum, e) => {
    sum += (e[1] * 100);
    return sum;
  }, 0);

  if (change === avail) { // give change but close
    return {
      status: "CLOSED",
      change: cid
    };
  } else if (avail < change) { // not enough funds to give change
    return {
      status: "INSUFFICIENT_FUNDS",
      change: []
    };
  }

  function getChangeAmounts (amount) {
    // returns an object with status and change keys;

    let carry = amount;
    let changeArr = [];

    // an array of coins and bills all scaled down to a penny
    let currArr = [
            1,      // PENNY
            5,      // NICKEL
            10,     // DIME
            25,     // QUARTER
            100,    // ONE
            500,    // FIVE
            1000,   // TEN
            2000,   // TWENTY
            10000,  // ONE HUNDRED
          ];

      function updateCarry (index, currCarry, drawer) {
        // return the amount to be carried over to the next lower bill/coin value
        let units = Math.floor(currCarry / currArr[index]);
        let value = units * currArr[index];
        currCarry -= value;
        if (value > (drawer[index][1] * 100)) {
          let diff = value - (drawer[index][1] * 100);
          value = drawer[index][1] * 100;
          currCarry += diff;
        }
        if (value > 0) {
          changeArr.push([drawer[index][0], value]);
        }
        return currCarry;
      }

      for (let i = 8; i >= 0; i--) {
        // this loop builds up the changeArr
        if (i === 0) {
          if (carry > (cid[i][1] * 100)) { // can't give out exact change
            return {
              status: "INSUFFICIENT_FUNDS",
              change: []
            };
          } else {
            if (carry > 0) {
              changeArr.push([cid[i][0], carry]);
            }
            break;
          }
        }
        if (carry >= currArr[i]) {
          carry = updateCarry(i, carry, cid);
        }
      }

      // sort change amounts in descending order and scale up to a dollar
      changeArr = changeArr.sort((a, b) => {
        if (a[1] > b[1]) {
          return -1;
        }
        return 1;
      })
      .map(e => {
        return [e[0], e[1] / 100];
      });

      return {
        status: "OPEN",
        change: changeArr
      };
  }

  return getChangeAmounts(change);
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);