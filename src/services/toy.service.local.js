import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
}

function query() {
    return storageService.query(TOY_KEY)
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy() {
	return {
		name: '',
		price: 0,
		labels: [],
		createdAt: Date.now(),
		inStock: false,
	}
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('audu', 300))
        toys.push(_createToy('fiak', 120))
        toys.push(_createToy('subali', 100))
        toys.push(_createToy('mitsu', 150))
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

// function _createToy(vendor, speed = 250) {
//     const toy = getEmptyToy(vendor, speed)
//     toy._id = utilService.makeId()
//     return toy
// }



// function _createToys() {
// 	let toys = utilService.loadFromStorage(KEY)
// 	if (!toys || !toys.length) {
// 		toys = [_createToy('Superman', utilService.getRandomIntInc(20, 100)), _createToy('Batman', utilService.getRandomIntInc(20, 150)), _createToy('Ironman', utilService.getRandomIntInc(20, 100))]
// 		utilService.saveToStorage(KEY, toys)
// 	}
// 	return toys
// }

function _createToy(name, price) {
	return {
		_id: utilService.makeId(),
		name,
		price,
		labels: [
			{ title: 'Doll', color: '#6d28d9' },
			{ title: 'Battery Powered', color: '#71717a' },
			{ title: 'Baby', color: '#2563eb' },
		],
		createdAt: Date.now(),
		inStock: true,
	}
}