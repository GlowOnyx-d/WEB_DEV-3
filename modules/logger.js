function logMessage(message) {
    const time = new Date().toLocaleTimeString();
    console.log("[" + time + "] " + message);
}

module.exports = logMessage;