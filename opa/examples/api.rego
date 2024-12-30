package envoy.http.public

import rego.v1

default allow := false

allow if {
	input.attributes.request.http.method == "GET"
	input.attributes.request.http.path == "/"
}

allow if input.attributes.request.http.headers.authorization == "Basic charlie"
