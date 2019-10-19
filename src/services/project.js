import { WebService } from "./service";
import { UserService } from './user'
import { orderBy } from 'lodash'
class ProjectServiceClass extends WebService {

  static localStorageUserKey = "User:data"

  constructor() {
    const getToken = () => {
      const user = UserService.getUserLogged()
      return user ? user.token : undefined
    }
    super('project', getToken)
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

  getProjectReport(id, from, to, topics) {
    const query = { topic: topics, from, to }
    const options = { method: 'GET', qs: query }
    return super.request(options, `/${id}/report/`)
  }

  getStudentReport(id, from, to, topics) {
    const query = { topic: topics, from, to }
    const options = { method: 'GET', qs: query }
    return super.request(options, `/report/user/${id}/`)
  }

  getProjectsReport(from, to, topics = []) {
    const query = {
      from: from || undefined,
      to: to || undefined,
      topic: topics,
    }
    const options = { method: 'GET', qs: query }
    return super.request(options, `/report/user/`)
  }


  getReportTimeline(project_id, from, type = 'months', each = 6, steps = 4, topic = [], separeByTopic) {
    const query = {
      project_id
      , from
      , type
      , each
      , steps
      , topic
      , separeByTopic
    }
    const options = { method: 'GET', qs: query }
    return super.request(options, `/${project_id}/report/timeline/`)
  }

  // deprecated, this function has been moved to api
  getTestCasesByDifficult(report) {
    const map = report
      .reduce((testMap, userReport) => {

        const { skills = [] } = userReport

        skills.forEach(skill => {
          const { tests } = skill
          return tests.forEach(({ _id, name, objective, summaries_not_approved }) => {
            testMap[_id] = testMap[_id]
              ? { ...testMap[_id], summaries_not_approved: testMap[_id].summaries_not_approved + summaries_not_approved.length }
              : { _id, name, objective, summaries_not_approved: summaries_not_approved.length }
          })
        })

        return testMap

      }, {})

    return orderBy(Object.values(map), ['summaries_not_approved'], ['desc'])

  }
  // deprecated, this function has been moved to api
  getTheMostSkilledStudentByTopic(report) {

    const map = report
      // flat
      .map(userReport => {
        const { id, firstname, lastname, skills = [] } = userReport
        const fullname = `${firstname} ${lastname}`
        return skills.map(skill => {
          const { name, description, info: { level } } = skill
          return { student: { id, fullname }, topic: { name, description, level } }
        })
      })
      // put all in a single array
      .reduce((acc, arrayOfUserTopics) => acc.concat(arrayOfUserTopics), [])
      // map the topics
      .reduce((map, userReport) => {
        const { student: studentTopic, topic } = userReport
        const { id, fullname } = studentTopic
        const { name, description, level: noFixedLevel } = topic
        const level = +noFixedLevel.toFixed(2)
        const student = { id, fullname }
        const skillInMap = map[name]
        if (!skillInMap || (skillInMap && level > skillInMap.level)) {
          return { ...map, [name]: { name, description, level, students: [student] } }
        } else if (level === skillInMap.level) {
          const students = map[name].students.concat([student])
          return { ...map, [name]: { name, description, level, students } }
        } else {
          return { ...map }
        }

      }, {})

    return orderBy(Object.values(map), ['level'], ['desc'])
  }
}

export const ProjectService = new ProjectServiceClass()