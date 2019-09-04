import { WebService } from "./service";
import { UserService } from './user'

class ProjectServiceClass extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const user = UserService.getUserLogged()
    super('project', user ? user.token : undefined)
  }

  createProject(project) {
    const options = {
      method: 'POST',
      body: project
    }
    return super.request(options)
  }

  deleteProject(id) {
    const options = { method: 'DELETE' }
    return super.request(options, `/${id}/`)
  }

  deleteTest(project_id, id) {
    const options = { method: 'DELETE' }
    return super.request(options, `/${project_id}/test/${id}`)
  }

  deleteTestCase(project_id, test_id, id) {
    const options = { method: 'DELETE' }
    return super.request(options, `/${project_id}/test/${test_id}/case/${id}`)
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

  exportMoodleActivity(id) {
    super.openWindow(`/${id}/export/moodle?token=${super.getToken()}`)
  }

  exportJson(id) {
    super.openWindow(`/${id}/export/json?token=${super.getToken()}`)
  }

  isBlocked(project) {
    const isblocked = project && !!project._id && !!project.summaries && project.summaries.length > 0
    return isblocked
  }
}

export const ProjectService = new ProjectServiceClass()