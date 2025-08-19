import { NextResponse } from 'next/server';

export function middleware() {
  const res = NextResponse.next();

  res.headers.set(
    'Content-Security-Policy',
    `default-src 'self';
    script-src 'self' https://js.stripe.com;
    style-src 'self' https://js.stripe.com https://m.stripe.network https://b.stripecdn.com https://hcaptcha.com https://*.hcaptcha.com;`.replace(
      /\n/g,
      ' '
    )
  );

  return res;
}

export const config = {
  matcher: ['/donate/:path*'],
};
