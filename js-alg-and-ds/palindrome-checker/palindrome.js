function palindrome(str) {
    let clean;
    
    clean = str.replace(/[^a-z0-9]/ig, '').toLowerCase();
    return clean === clean.split('').reverse().join('');
}