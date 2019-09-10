import { WebService } from "./service";
import { UserService } from './user'

class StudentServiceClass extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const getToken = ()=>{
      const user = UserService.getUserLogged()
      return user ? user.token : undefined
    }
    super('users/students', getToken)
  }

  getStudents(page, limit, sort) {
    const query = { page, limit, sort }
    const options = { method: 'GET', qs: query }
    return super.request(options)
  }


}

export const StudentService = new StudentServiceClass()