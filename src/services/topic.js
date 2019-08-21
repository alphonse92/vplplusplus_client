import { WebService } from "./service";
import { UserService } from './user'

export class TopicService extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const user = UserService.getUserLogged()
    super('topic', user ? user.token : undefined)
  }

  find(query) {
    const options = {
      method: 'GET',
      qs: query
    }
    return super.request(options)
  }
}