import ClientPaymentConfirm from './ClientPaymentConfirm';
import { Suspense } from 'react';

export default function PaymentConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientPaymentConfirm />
    </Suspense>
  );
}
