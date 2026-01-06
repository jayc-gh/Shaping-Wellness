import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, volunteersTable } from '@/lib/supabaseServer';
import { VolunteerFormData } from '@/declarations';
import SendFormEmail from '@/lib/functions/brevo/brevoForms';

export async function POST(req: NextRequest) {
  if (req.headers.get('server-token') !== process.env.SERVER_KEY) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      phone,
      email,
      DOB,
      address,
      AoI,
      volunteerHours,
    } = body;

    const formData: VolunteerFormData = {
      firstName,
      lastName,
      phone,
      email,
      DOB,
      address,
      AoI,
      volunteerHours,
    };

    const volunteerFormId = await storeData(formData);
    const now = new Date();
    const dateChicagoTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now);

    const emailProps = {
      firstName,
      lastName,
      formType: 'Volunteer',
      formId: volunteerFormId,
      email,
      date: dateChicagoTime,
    };
    await SendFormEmail(emailProps);

    return NextResponse.json({
      volunteerFormId,
    });
  } catch (error) {
    let message =
      'Something went wrong while submitting your volunteer form. Please try again.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/volunteer' },
    });
    if (error && typeof error === 'object' && 'type' in error) {
      // Stripe-specific error
      const stripeError = error as { message?: string; type?: string };
      message = stripeError.message || 'There was a problem with your payment.';
    } else if (error instanceof Error) {
      // Generic JS error
      message = error.message;
    } else {
      message = 'Unknown error occurred.';
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

const storeData = async (formData: VolunteerFormData) => {
  const AoIMap: Record<string, string> = {
    programCoord: 'program_coordination',
    expertWorkshop: 'expert_workshop',
    mentor: 'mentor',
  };

  const AoI = Object.entries(formData.AoI)
    .filter(([, value]) => value === 'yes')
    .map(([key]) => AoIMap[key]);

  const { data, error } = await supabaseServer
    .from(volunteersTable)
    .insert({
      first_name: formData.firstName.toLowerCase(),
      last_name: formData.lastName.toLowerCase(),
      phone_number: formData.phone.number,
      phone_type: formData.phone.type,
      email: formData.email.toLowerCase(),
      DOB: `${formData.DOB.month}/${formData.DOB.day}/${formData.DOB.year}`,
      address_1: formData.address.address1,
      address_2: formData.address.address2,
      city: formData.address.city,
      state: formData.address.state,
      country: formData.address.country,
      postal_code: formData.address.postalCode,
      areas_of_interest: AoI,
      need_volunteer_hours: formData.volunteerHours,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  } else {
    return data.id;
  }
};
