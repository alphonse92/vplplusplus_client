export class WebService {
	constructor(url,token) {
		this.API = process.env.REACT_APP_API_BASEURL
		this.url = `${this.API}/${url}`
		this.token = token
	}

	createHeaders() {
		const headers = new Headers()
		const {token} = this
		headers.append('content-type', 'application/json')
		if (token) headers.append('Authorization', `Bearer ${token}`)
		return headers
	}

	request(customOpts,path = '/') {
		const url = `${this.url}${path}`
		const headers = this.createHeaders()
		const { body } = customOpts
		if (body)
			customOpts.body = JSON.stringify(body)
		const options = { headers, ...customOpts }
		return fetch(url, options)
	}


}