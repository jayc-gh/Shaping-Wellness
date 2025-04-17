import { FormInfo } from '@/declarations';
import { formatPhoneNumber } from '@/lib/functions';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
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
            setFormData({ ...formData, phone: formattedPhone });
          }}
          placeholder="(000) 000-0000"
          className="input-field"
        />
      </label>
    </div>
  );
}
