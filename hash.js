class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  _hashString(string) {
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
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);

    if (!this._slots[index]) {
      this.length++;
    }

    this._slots[index] = {
      key,
      value,
      deleted: false
    };
  }

  _findSlot(key) {
    const hash = this._hashString(key);
    const start = hash % this._capacity;

    for (let i = 0; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key === key && !slot.delete) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
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

module.exports = HashMap;