function LRUCache(m) {
	let max = m
	let queue = []
	let cache = {}
	
	return {
		set(key, value) {
			if (cache.hasOwnProperty(key)) {
				// remove key for reordering later
				let i = queue.indexOf(key)
				let newQueue = [...queue]
				newQueue.splice(i, 1)
				queue = newQueue
			} else {
				// make space, remove least recently used
				if (queue.length === max) {
					let newQueue = [...queue]
					delete cache[newQueue.shift()]
					queue = newQueue
				}
			}
			
			queue.push(key)
			cache[key] = value
		},
		get(key) {
			if (!cache.hasOwnProperty(key)) {
				return null
			} else {
				// reorder queue
				let i = queue.indexOf(key)
				let newQueue = [...queue]
				newQueue.splice(i, 1)
				newQueue.push(key)
				queue = newQueue

				return cache[key]
			}
		},
		print() {
			console.log("===> Printing cache...")
			console.log('Cache: ', cache)
			console.log('Queue: ', queue)
		},
		flush() {
			queue = []
			cache = {}
			console.log('===> Flushed cache.')
		},
	}
}

/*****************/
/* SAMPLE RUNNER */
/*****************/

let lruCache = new LRUCache(3)

lruCache.set('first', 1)
lruCache.set('second', 2)
lruCache.set('third', 3)
lruCache.print() // 1, 2, 3

console.log(lruCache.get('second'))
lruCache.print() // 1, 3, 2

lruCache.set('fourth', 4)
lruCache.print() // 3, 2, 4

console.log(lruCache.get('first')) // null
lruCache.print() // 3, 2, 4

console.log(lruCache.get('third'))
lruCache.print() // 2, 4, 3

lruCache.flush()
lruCache.print()