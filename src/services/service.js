import qs from 'qs'
export class WebService {
	constructor(url, token) {
		this.API = process.env.REACT_APP_API_BASEURL
		this.url = `${this.API}/${url}`
		this.token = token
	}

	getToken() {
		return this.token
	}

	getUrl() {
		return this.url
	}

	createHeaders() {
		const headers = new Headers()
		const { token } = this
		headers.append('content-type', 'application/json')
		if (token) headers.append('Authorization', `Bearer ${token}`)
		return headers
	}

	request(customOpts, path = '/') {
		const querySearch = customOpts.qs ? '?' + qs.stringify(customOpts.qs) : ''
		const url = `${this.url}${path}${querySearch}`
		const headers = this.createHeaders()
		const { body } = customOpts
		if (body)
			customOpts.body = JSON.stringify(body)
		const options = { headers, ...customOpts }
		return fetch(url, options)
	}

	openWindow(path) {
		const url = `${this.getUrl()}${path}`
		window.open(url, "_blank")
	}


}