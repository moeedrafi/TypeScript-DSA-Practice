class HashTable {
  dataMap: [string, number][][];
  length: number;

  constructor(size = 7) {
    this.dataMap = new Array(size);
    this.length = size;
  }

  _hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
    }

    return hash;
  }

  _set(key: string, value: number) {
    const index = this._hash(key);

    if (!this.dataMap[index]) {
      this.dataMap[index] = [];
    }

    this.dataMap[index].push([key, value]);
    return this;
  }

  _get(key: string) {
    const index = this._hash(key);

    if (this.dataMap[index]) {
      for (let i = 0; i < this.dataMap[index].length; i++) {
        const [dataKey, dataValue] = this.dataMap[index][i];

        if (dataKey === key) {
          return dataValue;
        }
      }
    }

    return undefined;
  }

  _keys() {
    let allKeys = [];

    for (let i = 0; i < this.dataMap.length; i++) {
      if (this.dataMap[i]) {
        for (let j = 0; j < this.dataMap[i].length; j++) {
          allKeys.push(this.dataMap[i][j][0]);
        }
      }
    }

    return allKeys;
  }
}

let myHashTable = new HashTable();
myHashTable._set("bolts", 1400)._set("lumber", 70)._set("washers", 50);
console.log(myHashTable._keys());
