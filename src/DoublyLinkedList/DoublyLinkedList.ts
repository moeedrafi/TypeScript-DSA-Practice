class DListNode {
  value: number;
  next: DListNode | null;
  prev: DListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  head: DListNode | null;
  tail: DListNode | null;
  length: number;

  constructor(value: number) {
    const newNode = new DListNode(value);
    this.head = newNode;
    this.tail = newNode;
    this.length = 1;
  }

  printList(): void {
    let temp = this.head;
    while (temp != null) {
      console.log(temp.value);
      temp = temp.next;
    }
  }

  push(value: number): void {
    const newNode = new DListNode(value);

    if (this.head === null || this.tail === null) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }

    this.tail = newNode;
    this.length++;
  }

  pop(): DListNode | null {
    if (!this.tail) return null;

    let temp = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
      temp.prev = null;
    }

    this.length--;
    return temp;
  }

  unshift(value: number): void {
    const newNode = new DListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  shift(): DListNode | null {
    if (!this.head) return null;

    let temp: DListNode | null = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head!.prev = null;
      temp.next = null;
    }

    this.length--;
    return temp;
  }

  get(index: number): DListNode | null {
    if (index < 0 || index >= this.length) return null;

    let temp = this.head;
    if (index < this.length / 2) {
      for (let i = 0; i < index; i++) {
        temp = temp!.next;
      }
    } else {
      temp = this.tail;
      for (let i = this.length - 1; i > 0; i--) {
        temp = temp!.prev;
      }
    }

    return temp;
  }

  set(index: number, value: number): boolean {
    let temp = this.get(index);
    if (temp) {
      temp.value = value;
      return true;
    }

    return false;
  }

  insert(index: number, value: number): boolean {
    if (index < 0 || index >= this.length) return false;
    if (index == 0) {
      this.unshift(value);
      return true;
    }
    if (index === this.length) {
      this.push(value);
      return true;
    }

    const newNode = new DListNode(value);
    let before = this.get(index - 1);
    let after = before!.next;

    newNode.prev = before;
    newNode.next = after;
    before!.next = newNode;
    after!.prev = newNode;

    this.length++;
    return true;
  }

  remove(index: number): DListNode | null {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length) return this.pop();

    const temp = this.get(index);

    temp!.prev!.next = temp!.next;
    temp!.next!.prev = temp!.prev;
    temp!.prev = null;
    temp!.next = null;

    this.length--;
    return temp;
  }
}

let myDLL = new DoublyLinkedList(0);
myDLL.push(1);
myDLL.push(2);
myDLL.printList();
// console.log(myDLL);
