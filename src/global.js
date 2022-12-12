export const global = {
	SERVER_NAME: "http://localhost:5000",
	HEADERS: {
		"Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
	},
	PRIVATE_HEADERS: {
		Authorization: "Bearer " + localStorage.getItem("loginData"),
		"Content-Type": "application/json",
	},

  API_PERMISSIONS: "http://localhost:5000/api/permissions",
  API_PERMISSION_TYPES: "http://localhost:5000/api/permission-types",
}