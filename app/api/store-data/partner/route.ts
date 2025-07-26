import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, partnersTable } from '@/lib/supabaseServer';
import { PartnerFormData } from '@/declarations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orgName,
      school,
      address,
      firstName,
      lastName,
      phone,
      email,
      details,
      districtName,
      gradesServed,
    } = body;

    const formData: PartnerFormData = {
      orgName,
      school,
      address,
      firstName,
      lastName,
      phone,
      email,
      details,
      districtName,
      gradesServed,
    };

    const partnerFormId = await storeData(formData);

    return NextResponse.json({
      partnerFormId,
    });
  } catch (error) {
    let message =
      'Something went wrong while submitting your partnership form. Please try again.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/partner' },
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

const storeData = async (formData: PartnerFormData) => {
  const gradesMap: Record<string, string> = {
    middleSchool: '6_to_8',
    highSchool: '9_to_12',
  };

  const gradesServed = Object.entries(formData.gradesServed)
    .filter(([, value]) => value === 'yes')
    .map(([key]) => gradesMap[key]);

  const { data, error } = await supabaseServer
    .from(partnersTable)
    .insert({
      org_name: formData.orgName.toLowerCase(),
      school: formData.school,
      address_1: formData.address.address1,
      address_2: formData.address.address2,
      city: formData.address.city,
      state: formData.address.state,
      country: formData.address.country,
      postal_code: formData.address.postalCode,
      first_name: formData.firstName.toLowerCase(),
      last_name: formData.lastName.toLowerCase(),
      email: formData.email.toLowerCase(),
      details: formData.details,
      phone_number: formData.phone.number,
      phone_type: formData.phone.type,
      grades_served: gradesServed,
      district_name: formData.districtName,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  } else {
    return data.id;
  }
};
