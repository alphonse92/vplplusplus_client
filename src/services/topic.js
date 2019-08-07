import { WebService } from "./service";
import { UserService } from './user'

export class TopicService extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    super('topic', UserService.getUserLogged().token)
  }

  find(query) {
    const options = {
      method: 'GET',
      qs: query
    }
    return super.request(options)
  }
}