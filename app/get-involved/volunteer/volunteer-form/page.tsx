'use client';

import React, { useState } from 'react';
import Spinner from '../../../../components/spinner';
import Unchecked from '../../../app/icons/checked=no.svg';
import Checked from '../../../app/icons/checked=yes.svg';
import { handleSubmit } from '@/lib/functions';
import { DonateFormData, ErrorMap } from '@/declarations';
import LoadingDots from '../../../../components/loadingDots';

export default function VolunteerForm() {
  const [formData, setFormData] = useState<DonateFormData>({
    amount: '75',
    monthly: false,
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    country: 'US',
    state: '',
    city: '',
    postalCode: '',
    phone: '',
    anonymous: false,
    orgDonate: false,
    orgName: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrors, setShowErrors] = useState<ErrorMap>({
    email: false,
    orgName: false,
    address1: false,
    state: false,
    country: false,
    postalCode: false,
    city: false,
    firstName: false,
    lastName: false,
  });

  return (
    <main className="background">
      <div className="main-container">
        <div className="content-container">
          <div className="summary-container">
            <div className="flag">
              <h4>DONATE</h4>
            </div>
            <h3 className="text-white">Every dollar makes a difference</h3>
            <p className="p3 !text-white">
              Millions of young girls lack access to resources that support
              their health and well-being. Your support helps provide fitness
              programs, educational workshops, and safe spaces where they can
              thrive.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
