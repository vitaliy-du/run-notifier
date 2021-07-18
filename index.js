function Map() {
	var keys = [];
	var vals = [];

	this.delete = function (key) {
		var i = keys.indexOf(key);
		if (i < 0) return false;
		keys.splice(i, 1);
		vals.splice(i, 1);
		return true;
	}

	this.forEach = function (callbackFn) {
		keys.forEach((key, i) => callbackFn(vals[i], key, this));
	}

	Object.defineProperty(this, 'size', {
		get() {
			return keys.length;
		}
	});
}

export function Notifier() {
	this._listeners = (typeof window.Map == 'function') ? new window.Map() : new Map();

	this.onStart = function () {}
	this.onStop = function () {}

	this.addListener = function (listener, notice, ...extra) {
		this._listeners.size || this.onStart();
		this._listeners.set(listener, {extra: {...extra}, notice});
	}

	this.notify = function (listener, target, params) {
		target.notice && target.notice(params);
		if (typeof listener == 'function') listener(params);
	};

	this.removeListener = function (listener) {
		this._listeners.delete(listener);
		this._listeners.size || this.onStop();
	}

	this.signal = function (params) {
		this._listeners.forEach((target, listener) => {
			try {
				this.notify(listener, target, params);
			} catch (e) {
				console.error('Error in signal notify.', e);
			}
		});
	}
}