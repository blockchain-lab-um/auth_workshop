# opa

This folder contains examples of Open Policy Agent (OPA).

Website: <https://www.openpolicyagent.org/>

## Examples

You can find examples in the [examples](./examples/).

You can try out the example in [The Rego Playground](https://play.openpolicyagent.org/).

## HTTP APIs examples

```bash
cd api
cd bundles
../../opa build example.rego
cd ..
docker compose -f docker-compose.yml up
curl --user alice:password localhost:5000/finance/salary/alice # will succeed
curl --user bob:password localhost:5000/finance/salary/alice # will succeed
curl --user bob:password localhost:5000/finance/salary/charlie # will not succeed
```

## Exercise

- Update policy and include HR department which can see salary of everyone. Build new policy and rerun the example.
