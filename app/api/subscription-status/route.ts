import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, subscriptionInfoTable } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  const subscriptionId = req.nextUrl.searchParams.get('subscriptionId');
  if (!subscriptionId) {
    return NextResponse.json(
      { error: 'Missing subscription id' },
      { status: 400 }
    );
  }

  try {
    const { data: subscription, error } = await supabaseServer
      .from(subscriptionInfoTable)
      .select(
        'subscription_id, amount, status, billing_cycle_anchor, current_period_start, current_period_end'
      )
      .eq('subscription_id', subscriptionId)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      subscriptionId: subscription.subscription_id,
      status: subscription.status,
      amount: subscription.amount,
      billingCycleAnchor: subscription.billing_cycle_anchor,
      currentPeriodStart: subscription.current_period_start,
      currentPeriodEnd: subscription.current_period_end,
    });
  } catch (error) {
    console.error('Unexpected server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
