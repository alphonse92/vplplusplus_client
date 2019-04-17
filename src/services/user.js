import { Service } from "./service";


export class UserService extends Service {

	static localStorageUserKey = "User:data"

	constructor() {
		super('./user')
	}

	storeUserData(user_data) {
		localStorage(UserService.localStorageUserKey, JSON.stringify(user_data))
		return user_data
	}

	getStoredUserData() {
		return localStorage.getItem(UserService.localStorageUserKey)
	}

}