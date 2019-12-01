import qs from 'qs'
import { LanguageService } from './language'

export class WebService {
	constructor(url, token) {

		this.API = window.__env__.API_BASEURL
		this.url = `${this.API}/${url}`
		this.token = token
	}

	getToken() {
		const isFN = typeof this.token === 'function'
		const tokenToREturn = isFN ? this.token() : this.token
		return tokenToREturn
	}

	getUrl() {
		return this.url
	}

	createHeaders() {
		const headers = new Headers()
		const token = this.getToken()
		headers.append('content-type', 'application/json')
		headers.append('Content-Language:', LanguageService.getCurrentLanguage())
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