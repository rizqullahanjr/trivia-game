import { NextRequest, NextResponse } from "next/server";


export async function authCheck(request: NextRequest) {
    const url = request.nextUrl.clone();
    let token;

    if(localStorage.token) token = JSON.parse(localStorage.token)
    const response =
        await fetch("http://192.168.18.174:8000/api/auth/check", {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
        })

    console.log(response)
    if(response.body) {


    } else {
        url.pathname = "login";
        return NextResponse.redirect(url)
    }
}



