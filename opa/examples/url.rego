package envoy.http.urlextract

import rego.v1

default allow := false

allow if {
	some user_name

	input.attributes.request.http.method == "GET"

	input.parsed_path = ["users", "profile", user_name]

	user_name == basic_auth.user_name
}

basic_auth := {"user_name": user_name, "password": password} if {
	v := input.attributes.request.http.headers.authorization
	startswith(v, "Basic ")
	s := substring(v, count("Basic "), -1)
	[user_name, password] := split(base64url.decode(s), ":")
}
