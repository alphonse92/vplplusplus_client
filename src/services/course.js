import { WebService } from "./service";
import { UserService } from './user'

export class CourseService extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const getToken = ()=>{
      const user = UserService.getUserLogged()
      return user ? user.token : undefined
    }
    super('course', getToken)
  }

  getMoodleActivities() {
    const options = { method: 'GET' }
    return super.request(options, '/activities')
  }
}