import { WebService } from "./service";
import { UserService } from './user'

export class TopicService extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const getToken = () => {
      const user = UserService.getUserLogged()
      return user ? user.token : undefined
    }
    super('topic', getToken)
  }

  list(page, limit, sort) {
    const query = { page, limit, sort }
    const options = { method: 'GET', qs: query }
    return super.request(options,'/list/')
  }

  find(query) {
    const options = {
      method: 'GET',
      qs: query
    }
    return super.request(options)
  }
}