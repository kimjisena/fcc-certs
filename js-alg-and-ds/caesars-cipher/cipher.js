function rot13(str) {
    let base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let text = '';
  
    function rotateLeft(index) {
      let left = base.slice(0, index);
      let right = base.slice(index);
      return right + left;
    }
    
    for (let char of str) {
      let index = base.indexOf(char);
      if (index >= 0) {
        text += rotateLeft(index)[13];
      } else {
        text += char;
      }
    }
  
    return text;
  }
  
  rot13("SERR PBQR PNZC");