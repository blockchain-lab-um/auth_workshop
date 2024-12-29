import { agent } from '../agent.js'

async function main() {
    const result = await agent.verifyCredential({
        credential: {
            "credentialSubject": {
                "you": "Rock",
                "id": "did:web:example.com"
            },
            "issuer": {
                "id": "did:ethr:sepolia:0x03ba7d5c10346555e6c648b3878de604771dfcda532627858f7264f9e163d025cc"
            },
            "type": [
                "VerifiableCredential"
            ],
            "@context": [
                "https://www.w3.org/2018/credentials/v1"
            ],
            "issuanceDate": "2024-12-29T16:07:11.000Z",
            "proof": {
                "type": "JwtProof2020",
                "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MzU0ODg0MzEsImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHgwM2JhN2Q1YzEwMzQ2NTU1ZTZjNjQ4YjM4NzhkZTYwNDc3MWRmY2RhNTMyNjI3ODU4ZjcyNjRmOWUxNjNkMDI1Y2MifQ.wQlhWTR2JeuRFSvj28CPTJvjl3QGcs_bjGS4jS71uhc3vQ0AIcY6dmHQrKMmvq373eQQvwjBBJ7afgmskn4ZRQ"
            }
        }
    })
    console.log(`Credential verified`, result.verified)
}

main().catch(console.log)