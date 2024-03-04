import jwt, { Secret } from "jsonwebtoken"

interface Payload {
    youId: string;
    exp: number
}

function generateToken(payload: Payload) {
    const secret: Secret = process.env.ACCESS_TOKEN_SECRET || '';
    return jwt.sign(payload, secret)
}  // 토큰 생성 

//  검증 
function verifyToken(token: string): Promise<Payload | string> {
    const secret: Secret = process.env.ACCESS_TOKEN_SECRET || '';

    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decodedPayload) => {
            if (err) {
                reject(err.message)
            } else {
                resolve(decodedPayload as Payload)
            }
        })
    })
}

export { generateToken, verifyToken };