import { WebService } from "./service";
import { UserService } from './user'

export class CourseService extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const user = UserService.getUserLogged()
    super('course', user ? user.token : undefined)
  }

  getMoodleActivities() {
    const options = { method: 'GET' }
    return super.request(options, '/activities')
  }
}