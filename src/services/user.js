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

	static saveUserLogged(user_data) {
		localStorage.setItem(UserService.localStorageUserKey, JSON.stringify(user_data))
		return user_data
	}

	static getUserLogged() {
		const string = localStorage.getItem(UserService.localStorageUserKey)
		if (!string) return null
		return JSON.parse(string)
	}

	getStoredUserData() {
		return localStorage.getItem(UserService.localStorageUserKey)
	}

}