import { WebService } from "./service";
import { UserService } from './user'

class ApplicationServiceClass extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const getToken = () => {
      const user = UserService.getUserLogged()
      return user ? user.token : undefined
    }
    super('token', getToken)
  }

  getApplications() {
    const options = { method: 'GET' }
    return super.request(options)
  }

  deleteApplication(id) {
    const options = { method: 'DELETE' }
    return super.request(options, `/${id}/`)
  }


}

export const ApplicationService = new ApplicationServiceClass()