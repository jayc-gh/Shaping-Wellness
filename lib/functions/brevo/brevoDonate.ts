import { NextResponse } from 'next/server';
import { SendEmailProps } from '../emailFunctions';

export default async function SendEmail(
  props: SendEmailProps,
  template: string
) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }
  const templateMap: Record<string, number | ''> = {
    success: 2,
    failed: 6,
    pending: 5,
  };
  const uuid = crypto.randomUUID();
  const templateId = templateMap[template] ?? '';
  const payload = {
    to: [{ email: props.email }],
    templateId: templateId,
    params: {
      name: `${props.firstName} ${props.lastName}`,
      idType: props.idType,
      userId: props.userId,
      totalCharged: `$${(Number(props.totalCharged) / 100).toFixed(2)}`,
      donationAmount: `$${(Number(props.donationAmount) / 100).toFixed(2)}`,
      frequency: props.frequency,
      orgName: props.orgName,
      email: props.email,
      phoneType: props.phoneType || 'Mobile',
      phoneNum: props.phoneNum || 'N/A',
      address1: props.address1,
      address2: props.address2,
      city: props.city,
      state: props.state,
      postalCode: props.postalCode,
      country: props.country,
      paymentMethod: props.paymentMethod,
      paymentType: props.paymentType,
      last4: props.last4,
      nextBillingDate: props.nextBillingDate,
      uuid: uuid,
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
