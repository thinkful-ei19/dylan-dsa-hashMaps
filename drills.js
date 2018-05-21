const HashMap = require('./hash');
const HashMapCollision = require('./hash-map-collision');

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;
HashMapCollision.MAX_LOAD_RATIO = 0.9;
HashMapCollision.SIZE_RATIO = 3;

const lor = new HashMap();
const lorCollision = new HashMapCollision();

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

  const oddKeys = new HashMap();

  for (let i = 0; i < letters.length; i++) {
    let value = perm.get(letters[i]);
    if (value % 2 === 0) {
      continue;
    } else {
      oddKeys.set(letters[i], value);
    }
  }

  // for (let i = 0; i < perm.length; i++) {
  //   // console.log(perm._slots[i]);
  //   if (perm._slots[i].value % 2 !== 0) {
  //     numOfOdd++;
  //   }
  // }

  if (oddKeys.length > 1) {
    return false;
  } else {
    return true;
  }

}

function anagramGrouping(arr) {
  let myHash = new HashMap();
  for (let i = 0; i < arr.length; i++) {
    let ascCount = 0;
    for (let j = 0; j < arr[i].length; j++) {
      ascCount += arr[i].charCodeAt(j);
      myHash.set(arr[i], ascCount);
    }
  }

  const combined = new HashMap();

  for (let i = 0; i < arr.length; i++) {
    let value = myHash.get(arr[i]);
    if (combined.get(value)) {
      let currentArr = combined.get(value);
      combined.set(value, [...currentArr, arr[i]]);
    } else {
      combined.set(value, [arr[i]]);
    }
  }

  const final = [];

  for (let i = 0; i < combined.length; i++) {

    if (combined._slots[i]) {
      final.push(combined._slots[i].value);
    }
  }

  return final;
  // return JSON.stringify(combined, null, 2);
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
  // console.log(lor);
  // console.log(lor.get('Maiar'));
  // console.log(isPermutationPalindrome('acceeeearr'));
  // console.log(isPermutationPalindrome('north'));
  // console.log(isPermutationPalindrome('a man a plan a canal panama'));
  // console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

  lorCollision.set('Hobbit', 'Bilbo');
  lorCollision.set('Hobbit', 'Frodo');
  lorCollision.set('Wizard', 'Gandolf');
  lorCollision.set('Human', 'Aragon');
  lorCollision.set('Elf', 'Legolas');
  lorCollision.set('Maiar', 'The Necromancer');
  lorCollision.set('Maiar', 'Sauron');
  lorCollision.set('RingBearer', 'Gollum');
  lorCollision.set('LadyOfLight', 'Galadriel');
  lorCollision.set('HalfElven', 'Arwen');
  lorCollision.set('Ent', 'Treebeard');

  console.log(JSON.stringify(lorCollision, null, 2));

}

main();