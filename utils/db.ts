import { firestore } from '../lib/firebase'

export function updateUser(uid, data) {
	return firestore.collection('users').doc(uid).update(data)
}

export function createUser(uid, data) {
	return firestore
		.collection('users')
		.doc(uid)
		.set({ uid, ...data }, { merge: true })
}

export function updateProfilePicture(uid, image) {
	console.log(uid, image);
	
	return firestore
	.collection('users')
	.doc(uid)
	.update({profileImg: image})
}