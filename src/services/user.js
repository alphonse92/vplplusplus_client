import { WebService } from "./service";


export class UserService extends WebService {

	static localStorageUserKey = "User:data"

	constructor() {
		super('./user')
	}

	login(data) {

		return super.request(data)
	}

	storeUserData(user_data) {
		localStorage(UserService.localStorageUserKey, JSON.stringify(user_data))
		return user_data
	}

	getStoredUserData() {
		return localStorage.getItem(UserService.localStorageUserKey)
	}

}