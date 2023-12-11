class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets;
    this.count = 0;
    this.data = new Array(this.capacity);

    for (let i = 0; i < this.capacity; i++) {
      this.data[i] = null;
    }
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    const keyValue = new KeyValuePair(key, value);

    if ((this.count / this.capacity) >= 0.7) {
      this.resize();
    }

    const index = this.hashMod(key);

    let currBucket = this.data[index];

    while (currBucket) {
      if (currBucket.key === keyValue.key) {
        currBucket.value = keyValue.value;
        return;
      }

      currBucket = currBucket.next;
    }

    keyValue.next = this.data[index];

    this.data[index] = keyValue;
    this.count++;
  }


  read(key) {
    // Your code here
    const index = this.hashMod(key);
    let currBucket = this.data[index];

    while (currBucket) {
      if (currBucket.key === key) {
        return currBucket.value;
      }

      currBucket = currBucket.next;
    }
  }


  resize() {
    // Your code here
    this.capacity *= 2;

    const newArr = [...this.data];
    this.data = new Array(this.capacity).fill(null);

    for (let i = 0; i < newArr.length; i++) {
      let currBucket = newArr[i];

      while (currBucket) {
        let index = this.hashMod(currBucket.key);
        let next = currBucket.next;
        currBucket.next = this.data[index];
        this.data[index] = currBucket;
        currBucket = next;
      }
    }
  }


  delete(key) {
    // Your code here
    const index = this.hashMod(key);

    let currBucket = this.data[index];

    if (currBucket && currBucket.key === key) {
      this.data[index] = currBucket.next;
      this.count--;
      return;
    }

    while (currBucket && currBucket.next) {
      if (key === currBucket.next.key) {
        currBucket.next = currBucket.next.next;
        this.count--;
        return;
      }

      currBucket = currBucket.next;
    }

    return 'Key not found';
  }
}


module.exports = HashTable;
