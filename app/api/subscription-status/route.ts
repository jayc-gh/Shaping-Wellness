import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  const subscriptionId = req.nextUrl.searchParams.get('subscriptionId');
  if (!subscriptionId) {
    return NextResponse.json(
      { error: 'Missing subscription id' },
      { status: 400 }
    );
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      amount: subscription.items.data[0].price.unit_amount,
      billingCycleAnchor: subscription.billing_cycle_anchor,
      currentPeriodStart: subscription.current_period_start,
      currentPeriodEnd: subscription.current_period_end,
    });
  } catch (error) {
    console.error('Supabase query error:', error);
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
