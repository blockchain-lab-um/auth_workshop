package httpapi.authz

# bob is alice's manager, and betty is charlie's.
subordinates := {"alice": [], "charlie": [], "bob": ["alice"], "betty": ["charlie"]}

default allow := false

allow if {
	input.method == "GET"
	input.path == ["finance", "salary", input.user]
}

allow if {
	some username
	input.method == "GET"
	input.path = ["finance", "salary", username]
	subordinates[input.user][_] == username
}
