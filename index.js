export default function() {
	let cookieJar = [];		//keep an array of all cookies [ {name: '...', value: '...'}, ... ]
	let cookieString = '';	//keep a copy of the last parsed cookie string
	
	//--- Public methods ----------------------------------------------------------------------------------------------
	
	/**
	 * Set a cookie with the given name, value, expiration (in days) and the given path
	 *
	 * @param name
	 * @param value
	 * @param expire
	 * @param path
	 */
	this.set = (name, value, expire, path = '/') => {
		let d = new Date();
		d.setTime(d.getTime() + (expire * 24 * 60 * 60 * 1000));
		document.cookie = `${name}=${value};expires=${d.toUTCString()};path=${path}`;
		
		return {name, value, expires: d, path};
	};
	
	/**
	 * Get the value of the given cookie name. If not set, null is returned.
	 *
	 * @param name
	 * @returns {null|string}
	 */
	this.get = name => {
		let cj = getCookieJar();
		for (let i = 0; i < cj.length; i++) {
			if (cj[i].name === name) return cj[i].value;
		}
		return null;
	};
	
	this.has = name => {
		let cj = getCookieJar();
		for (let i = 0; i < cj.length; i++) {
			if (cj[i].name === name) return true;
		}
		return false;
	};
	
	/**
	 * Remove the cookie with the given name (and optionally the path)
	 *
	 * @param name
	 * @param path
	 */
	this.remove = (name, path = '/') => {
		this.set(name, '', -1000, path);
		return true;
	};
	
	//--- Protected methods -------------------------------------------------------------------------------------------
	
	/**
	 * Parse the cookie string and build up an array of cookie objects.
	 * Each cookie object has a 'name' and a 'value' attribute.
	 *
	 * @returns {array}
	 */
	let getCookieJar = () => {
		//if the cookie string hasn't changed, return the current cookie Jar
		if (document.cookie === cookieString) return cookieJar;
		
		//start parsing the cookie string
		cookieString = document.cookie;
		cookieJar = [];
		let rawCookies = cookieString.split(';');
		
		for(let i = 0; i < rawCookies.length; i++) {
			let cookie = rawCookies[i].trim().split('=');
			cookieJar.push({name: cookie[0], value: cookie[1]});
		}
		
		return cookieJar;
	};
	
};