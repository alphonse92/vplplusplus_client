import { WebService } from "./service";
import { UserService } from './user'

class StudentServiceClass extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const user = UserService.getUserLogged()
    super('users/students', user ? user.token : undefined)
  }

  getStudents(page, limit, sort) {
    const query = { page, limit, sort }
    const options = { method: 'GET', qs: query }
    return super.request(options)
  }


}

export const StudentService = new StudentServiceClass()