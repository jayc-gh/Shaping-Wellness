import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabaseClient';
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const { data, error } = await supabaseClient
      .from('temp_tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const now = new Date();
    const expiresAt = new Date(data.expires_at);

    if (now > expiresAt) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // delete token after successful use
    await supabaseClient.from('temp_tokens').delete().eq('token', token);

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Stripe error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/verify-token' },
    });

    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
