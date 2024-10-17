const handleValidationError = (error, serviceName) => {
	error.status = 422;
	error.service = serviceName;
	error.message = error.details?.[0]?.message || error.message || "Validation Error";
	return error;
};

const handleError = (error, serviceName, method, status = 500) => {
	error.status === undefined ? (error.status = status) : null;
	error.service === undefined ? (error.service = serviceName) : null;
	error.method === undefined ? (error.method = method) : null;
	return error;
};

const fetchMonitorCertificate = async (tls, monitor) => {
	return new Promise((resolve, reject) => {
		const monitorUrl = new URL(monitor.url);
		const hostname = monitorUrl.hostname;
		try {
			let socket = tls.connect(
				{
					port: 443,
					host: hostname,
					servername: hostname, // this is required in case the server enabled SNI
				},
				() => {
					try {
						let x509Certificate = socket.getPeerX509Certificate();
						resolve(x509Certificate);
					} catch (error) {
						reject(error);
					} finally {
						socket.end();
					}
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

export { handleValidationError, handleError, fetchMonitorCertificate };
