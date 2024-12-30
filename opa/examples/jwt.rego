package envoy.http.jwt

import rego.v1

default allow := false

allow if {
	is_post
	is_dogs
	claims.username == "alice"
}

is_post if input.attributes.request.http.method == "POST"

is_dogs if input.attributes.request.http.path == "/pets/dogs"

claims := payload if {
	io.jwt.verify_hs256(bearer_token, "B41BD5F462719C6D6118E673A2389")

	[_, payload, _] := io.jwt.decode(bearer_token)
}

bearer_token := t if {
	v := input.attributes.request.http.headers.authorization
	startswith(v, "Bearer ")
	t := substring(v, count("Bearer "), -1)
}
