class Node {
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
	}

	getValue() {
		return this.value
	}

	setValue(value) {
		this.value = value
		return this
	}

	getLeft() {
		return this.left
	}

	getRight() {
		return this.right
	}

	setLeft(node) {
		this.left = node
		return this
	}

	setRight(node) {
		this.right = node
		return this
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null
		this.tail = null
		this.length = 0
	}

	_setHead(value) {
		this.head = new Node(value)
		this.tail = this.head
	}

	_increase() {
		this.length++
	}

	_decrease() {
		if (this.length > 0) this.length--
	}

	addTail(value) {
		if (!this.head) this._setHead(value)
		else {
			const node = new Node(value)

			this.tail.setRight(node)
			node.setLeft(this.tail)
			this.tail = node
		}

		this._increase()

		return this.tail
	}

	addHead(value) {
		if (!this.head) this._setHead(value)
		else {
			const node = new Node(value)

			this.head.setLeft(node)
			node.setRight(this.head)
			this.head = node
		}

		this._increase()

		return this.head
	}

	_removeHead() {
		let prevHead = this.head

		this.head = null
		this.tail = null

		return prevHead
	}

	removeTail() {
		if (this.isEmpty()) return new Error("List is empty")

		if (!this.head.getRight()) {
			let head = this._removeHead()
			this._decrease()
			return head
		}

		let prevTail = new Node(this.tail.getValue())

		let newTail = this.tail.left
		this.tail = newTail
		this.tail.setRight(null)

		this._decrease()

		return prevTail
	}

	removeHead() {
		if (this.isEmpty()) return new Error("List is empty")
		
		if (!this.head.getRight()) {
			let head = this._removeHead()
			this._decrease()
			return head
		}

		let prevHead = new Node(this.head.getValue())

		let newHead = this.head.getRight()
		newHead.setLeft(null)
		this.head = newHead

		this._decrease()

		return prevHead
	}

	moveToHead(node) {
		if (this.isEmpty()) return new Error("List is empty")

		let left = node.getLeft()
		let right = node.getRight()
		let head = this.getHead()

		if (!left) return new Error("Node is already head")

		if (right) right.setLeft(left)
		left.setRight(right)
		head.setLeft(node)
		node.setLeft(null)
		this.head = node

		return this.head
	} 

	moveToTail(node) {
		if (this.isEmpty()) return new Error("List is empty")

		let left = node.getLeft()
		let right = node.getRight()
		let head = this.getHead()
		let tail = this.getTail()

		if (!right) return new Error("Node is already tail")

		if (left) left.setRight(right)
		else this.head = right
		right.setLeft(left)
		tail.setRight(node)
		node.setLeft(tail)
		node.setRight(null)
		this.tail = node

		return this.tail
	} 

	getHead() {
		return this.head
	}

	getTail() {
		return this.tail
	}

	size() {
		return this.length
	}

	isEmpty() {
		return this.length === 0
	}
}

class Queue {
	constructor() {
		this.queue = new DoublyLinkedList()
	}

	push(arg) {
		if (arg instanceof Node) {
			return this.queue.moveToTail(arg)
		}

		return this.queue.addTail(arg)
	}

	shift(arg) {
		if (arg instanceof Node) {
			return this.queue.moveToHead(arg)
		}

		return this.queue.removeHead()
	}

	head() {
		return this.queue.getHead()
	}

	tail() {
		return this.queue.getTail()
	}

	indexOf(index) {
		if (index < 0) return new Error("Index cannot be less than zero")
		if (index + 1 > this.queue.size()) return new Error("Index is out of bounds")

		let counter = 0
		let node = this.head()

		while (counter !== index) {
			node = node.getRight()
			counter++
		}

		return node
	}

	size() {
		return this.queue.size()
	}

	print() {
		let node = this.head()

		while (node) {
			console.log(node)
			node = node.getRight()
		}
	}
}

class LRUCache {
	constructor(max) {
		this.max = max
		this.queue = new Queue()
		this.cache = new Map()
	}

	_updateQueue(node) {
		let left = node.getLeft()
		let right = node.getRight()

		this.queue.push(node)
	}

	set(key, value) {
		let node = this.cache.get(key)

		if (node) {
			this.node.setValue({key, value})
			this._updateQueue(node)
		} else {
			if (this.queue.size() === this.max) {
				let removed = this.queue.shift()

				this.queue.push({key, value})
				this.cache.set(key, this.queue.tail())
				this.cache.delete(removed.getValue().key)
			} else {
				this.queue.push({key, value})
				this.cache.set(key, this.queue.tail())
			}
		}
	}

	get(key) {
		let node = this.cache.get(key)

		if (!node) return new Error("Key not found")

		this._updateQueue(node)

		return node.getValue().value
	}

	flush() {
		this.queue = new Queue()
		this.cache = new Map()
	}
}

/*****************/
/* SAMPLE RUNNER */
/*****************/

let lc = new LRUCache(3)

lc.set('first', 1)
lc.set('second', 2)
lc.set('third', 3)
lc.queue.print() // 1, 2, 3

lc.set('fourth', 4)
lc.queue.print() // 2, 3, 4

lc.get('first') // Error

lc.get('third')
lc.queue.print() // 2, 4, 3
