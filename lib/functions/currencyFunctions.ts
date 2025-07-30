import { DonateFormData } from '@/declarations';

export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export function calcTransactionFee(
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>,
  donationAmount: string,
  feeCovered: boolean,
  paymentMethod: string
) {
  const cardFee = (amount: number) => (0.029 * amount + 0.3).toFixed(2);
  const bankFee = (amount: number) => Math.min(amount * 0.008, 5).toFixed(2);

  if (donationAmount === '') return;

  const baseAmount = Number(donationAmount);
  let feeAmount = 0;
  if (feeCovered) {
    if (
      paymentMethod === 'card' ||
      paymentMethod === 'apple_pay' ||
      paymentMethod === 'google_pay'
    ) {
      feeAmount = Number(cardFee(baseAmount));
    } else if (paymentMethod === 'us_bank_account') {
      feeAmount = Number(bankFee(baseAmount));
    }
  }

  const newAmount = feeCovered ? baseAmount + feeAmount : baseAmount;

  setFormData(prev => ({
    ...prev,
    feeCovered,
    feeAmount: feeAmount.toFixed(2),
    totalCharged: String(newAmount.toFixed(2)),
    paymentMethod,
  }));
}
