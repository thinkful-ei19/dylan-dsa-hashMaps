const HashMap = require('./hash');

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

// const lor = new HashMap();


function isPermutationPalindrome(str) {
  const perm = new HashMap();
  const letters = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  for (let i = 0; i < letters.length; i++) {
    let count = perm.get(letters[i]) || 1;
    if (perm.get(letters[i])) {
      count++;
    }
    perm.set(letters[i], count);
  }

  let numOfOdd = 0;

  for (let i = 0; i < letters.length; i++) {
    if (perm.get(letters[i]) % 2 !== 0) {
      numOfOdd++;
    }
  }

  if (numOfOdd > 1) {
    return false;
  } else {
    return true;
  }

}

function main() {
  // lor.set('Hobbit', 'Bilbo');
  // lor.set('Hobbit', 'Frodo');
  // lor.set('Wizard', 'Gandolf');
  // lor.set('Human', 'Aragon');
  // lor.set('Elf', 'Legolas');
  // lor.set('Maiar', 'The Necromancer');
  // lor.set('Maiar', 'Sauron');
  // lor.set('RingBearer', 'Gollum');
  // lor.set('LadyOfLight', 'Galadriel');
  // lor.set('HalfElven', 'Arwen');
  // lor.set('Ent', 'Treebeard');
  // console.log(JSON.stringify(lor, null, 2));
  // console.log(lor.get('Maiar'));
  console.log(isPermutationPalindrome('accearr'));
  console.log(isPermutationPalindrome('north'));
  console.log(isPermutationPalindrome('a man a plan a canal panama'));
}

main();