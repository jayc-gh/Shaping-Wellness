import { DonateFormData } from '@/declarations';

export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export function calcTransactionFee(
  formData: DonateFormData,
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>,
  setCheckboxDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { donationAmount, paymentMethod, feeCovered } = formData;
  const cardFee = (amount: number) => (0.029 * amount + 0.3).toFixed(2);
  const bankFee = (amount: number) => Math.min(amount * 0.008, 5).toFixed(2);

  if (donationAmount === '') return;

  const baseAmount = Number(donationAmount);
  let feeAmount = 0;

  if (paymentMethod === 'card' || paymentMethod === 'cashapp') {
    feeAmount = Number(cardFee(baseAmount));
  } else if (paymentMethod === 'us_bank_account') {
    feeAmount = Number(bankFee(baseAmount));
  }

  const newFeeCovered = !feeCovered;
  const newAmount = newFeeCovered ? baseAmount + feeAmount : baseAmount;

  setFormData(prev => ({
    ...prev,
    feeCovered: newFeeCovered,
    feeAmount: feeAmount.toFixed(2),
    totalCharged: String(newAmount),
  }));
  setCheckboxDisabled(false);
}
