import { NextResponse } from 'next/server'

export function middleware(req, ev) {
   console.log({ req, ev })
   return NextResponse.next('Nenad')
}
