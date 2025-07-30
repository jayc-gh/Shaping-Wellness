import { NextResponse } from 'next/server';

type EmailProps = {
  firstName: string;
  lastName: string;
  message?: string;
  formType: string;
  formId: string;
  email: string;
  date: string;
};

export default async function SendFormEmail(props: EmailProps) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  const payload = {
    to: [{ email: 'jay@shapingwellness.org' }],
    templateId: 8,
    params: {
      name: `${props.firstName} ${props.lastName}`,
      message: props.message,
      formType: props.formType,
      email: props.email,
      date: props.date,
      formId: props.formId,
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
