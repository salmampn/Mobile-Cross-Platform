// Mock implementation of the ws WebSocket module for React Native
class WebSocket {
	constructor(url, protocols) {
		this.url = url;
		this.protocols = protocols;
		this.readyState = 0; // CONNECTING
		this.bufferedAmount = 0;

		// Simulate immediate connection
		setTimeout(() => {
			this.readyState = 1; // OPEN
			if (typeof this.onopen === "function") {
				this.onopen({ target: this });
			}
		}, 0);
	}

	send(data) {
		// Mock implementation - doesn't actually send anything
		console.log("[WS Mock] Sending data:", data);
		return true;
	}

	close(code, reason) {
		if (this.readyState === 2 || this.readyState === 3) return;

		this.readyState = 2; // CLOSING
		setTimeout(() => {
			this.readyState = 3; // CLOSED
			if (typeof this.onclose === "function") {
				this.onclose({
					target: this,
					code: code || 1000,
					reason: reason || "",
					wasClean: true,
				});
			}
		}, 0);
	}
}

// WebSocket static properties
WebSocket.CONNECTING = 0;
WebSocket.OPEN = 1;
WebSocket.CLOSING = 2;
WebSocket.CLOSED = 3;

// Export WebSocket class as default and named
export default WebSocket;
export { WebSocket };
