import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, donationsTable } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  const paymentIntent = req.nextUrl.searchParams.get('payment_intent');
  if (!paymentIntent) {
    return NextResponse.json(
      { error: 'Missing payment intent id' },
      { status: 400 }
    );
  }

  try {
    const { data: donation, error } = await supabaseServer
      .from(donationsTable)
      .select('id, charged_amount, payment_status')
      .eq('payment_intent_id', paymentIntent)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      donorId: donation.id,
      status: donation.payment_status,
      amount: donation.charged_amount,
    });
  } catch (error) {
    console.error('Unexpected server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
