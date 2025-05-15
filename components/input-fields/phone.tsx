import { DonateFormData } from '@/declarations';
import { formatPhoneNumber } from '@/lib/functions';

interface StepProps {
  formData: DonateFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
}

export default function Phone({ formData, setFormData }: StepProps) {
  return (
    <div className="input-container">
      <label className="input-sub-container">
        {formData.orgDonate ? (
          <p>Contact Phone Number (optional)</p>
        ) : (
          <p>Phone Number (optional)</p>
        )}
        <input
          type="tel"
          value={formData.phone}
          onChange={e => {
            const formattedPhone = formatPhoneNumber(e.target.value);
            setFormData(prev => ({
              ...prev,
              phone: formattedPhone,
            }));
          }}
          placeholder="(000) 000-0000"
          className="input-field"
        />
      </label>
    </div>
  );
}
