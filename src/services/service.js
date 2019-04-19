export class WebService {

	constructor(url) {
		this.API = process.env.REACT_APP_API
		this.url = `${this.API}/${url}`
	}

	createHeaders(token) {
		const headers = new Headers()
		headers.append('content-type', 'application/json')
		if (token) headers.append('Authorization', `Bearer ${this.token}`)
		return headers
	}

	encodeQueryParametersFromUrl(url) {
		if (url.indexOf('?') >= 0) {
			const parts = url.split('?')
			const parseParams = parts
				.slice(1, parts.length)
				.join('?')
				.split('&')
				.map(att => {
					const attParts = att.split('=')
					attParts[1] = attParts[1] ? encodeURIComponent(attParts[1]) : ''
					return attParts.join('=')
				})
				.join('&')
			return parts[0] + '?' + parseParams
		}
		return url
	}

	request(options, token, path = '/') {
		const url = this.encodeQueryParametersFromUrl(`${this.url}${path}`)
		const headers = this.createHeaders(token)
		return fetch(url, { headers, ...options })
	}


}