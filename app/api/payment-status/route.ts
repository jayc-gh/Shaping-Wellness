import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  try {
    const { data: donation, error } = await supabaseClient
      .from('temp_tokens')
      .select('status, amount')
      .eq('token', token)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      status: donation.status,
      amount: donation.amount,
    });
  } catch (error) {
    console.error('Unexpected server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
