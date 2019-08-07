import { WebService } from "./service";
import { UserService } from './user'

export class CourseService extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    super('course', UserService.getUserLogged().token)
  }

  getMoodleActivities() {
    const options = { method: 'GET' }
    return super.request(options, '/activities')
  }
}