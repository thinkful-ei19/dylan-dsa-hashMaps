const LinkedList = require('./linked-list');

class HashMapCollision {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  _hashString(string) {
    // console.log(string, 'String');
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      // throw new Error('Key error');
      return undefined;
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + 1) / this._capacity;
    if (loadRatio > HashMapCollision.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapCollision.SIZE_RATIO);
    }
    const index = this._findSlot(key);

    if (!this._slots[index]) {
      this.length++;
    }

    if (!this._slots[index]) {
      this._slots[index] = new LinkedList();
      this._slots[index].insertFirst({ key, value, deleted: false });
    } else {
      this._slots[index].insertLast({ key, value, deleted: false });
    }

  }

  _findSlot(key) {
    const hash = this._hashString(key);
    const start = hash % this._capacity;

    for (let i = 0; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      // console.log(slot);
      if (slot === undefined || slot.head.value.key === key && !slot.head.value.delete) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    // console.log(oldSlots);
    this._capacity = size;
    this.length = 0;
    this._slots = [];

    for (const list of oldSlots) {
      if (list !== undefined && !list.head.value.deleted) {
        this.set(list.head.value.key, list.head.value.value);
      }
      // if (list.head.next) {
      //   this.set(list.head.next.value.key, list.head.next.value.value);
      // }
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slot[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

}

module.exports = HashMapCollision;