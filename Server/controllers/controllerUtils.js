import sslChecker from "ssl-checker";
import * as tls from "tls";

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

const fetchMonitorCertificate = async (monitor) => {
	return new Promise((resolve, reject) => {
		try {
			const monitorUrl = new URL(monitor.url);
			const hostname = monitorUrl.hostname;
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
			socket.on("error", (error) => {
				console.log(error);
				reject(
					new Error(
						`TLS connection error while fetching certificate from ${error.hostname}`
					)
				);
			});
		} catch (error) {
			reject(error);
		}
	});
};

const test = async () => {
	let host = "httpbin.org";
	console.log(cert.validTo);
	let socket = tls.connect(
		{
			port: 443,
			host,
			servername: host, // this is required in case the server enabled SNI
		},
		() => {
			let x509Certificate = socket.getPeerX509Certificate();
			console.log(x509Certificate.validTo);
		}
	);
};

export { handleValidationError, handleError, fetchMonitorCertificate, test };
