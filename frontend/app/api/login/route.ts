
const API_URL = ''

export async function GET(request: Request) {
    const res = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    return Response.json({data})
}