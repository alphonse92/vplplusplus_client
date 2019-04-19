import { WebService } from "./service";


export class UserService extends WebService {

	static localStorageUserKey = "User:data"

	constructor() {
		super('users')
	}

	login(body) {
		const method = 'POST'
		const options = { method, body }
		return super.request(options, null, '/auth')
	}

	storeUserData(user_data) {
		localStorage(UserService.localStorageUserKey, JSON.stringify(user_data))
		return user_data
	}

	getStoredUserData() {
		return localStorage.getItem(UserService.localStorageUserKey)
	}

}