import { NextResponse } from 'next/server';

type EmailProps = {
  firstName: string;
  lastName: string;
  details: string;
};

export default async function SendEmail(props: EmailProps, template: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  const templateMap: Record<string, number | ''> = {
    success: 2,
    failed: 6,
    pending: 5,
  };

  const templateId = templateMap[template] ?? '';

  const payload = {
    to: [{ email: 'contact@shapingwellness.org' }],
    templateId: templateId,
    params: {
      name: `${props.firstName} ${props.lastName}`,
      details: props.details,
    },
  };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Brevo error:', error);
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ messageId: data.messageId, status: res.status });
}
