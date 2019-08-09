import { WebService } from "./service";
import { UserService } from './user'

export class ProjectService extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    super('project', UserService.getUserLogged().token)
  }

  deleteProject(id) {
    const options = { method: 'DELETE' }
    return super.request(options, `/${id}/`)
  }

  getProjects(page, limit, sort) {
    const query = { page, limit, sort, populate: ['tests.test_cases.summaries', 'summaries'] }
    const options = {
      method: 'GET',
      qs: query
    }
    return super.request(options)
  }

  getProject(id) {
    const options = {
      method: 'GET'
    }
    return super.request(options, `/${id}/`)
  }
}