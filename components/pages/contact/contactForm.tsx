import './contactForm.css';

export default function ContactForm() {
  return (
    <form className="contact-form-box">
      <div className="contact-form-wrapper">
        <h4>CONTACT FORM</h4>
        <p className="p4">
          Have a question or need more information? Fill out the form, and our
          team will get back to you as soon as possible.
        </p>
        <div className="form-sub-container">
          <div className="input-container">
            <label className="input-sub-container">
              <p className="custom-text">
                First name <span className="required">*</span>
              </p>
              <input className="input-field" />
            </label>
            <label className="input-sub-container">
              <p className="custom-text">
                Last name <span className="required">*</span>
              </p>
              <input className="input-field" />
            </label>
          </div>
          <div className="input-container">
            <label className="input-sub-container">
              <p className="custom-text">
                Email <span className="required">*</span>
              </p>
              <input className="input-field" />
            </label>
          </div>
          <div className="input-container">
            <label className="input-sub-container">
              <p className="custom-text">
                How can we help? <span className="required">*</span>
              </p>
              <textarea
                className="input-field !h-[76px] resize-none !whitespace-pre-wrap !overflow-y-auto"
                rows={3}
              />
            </label>
          </div>
        </div>
        <button className="continue-btn" type="submit" disabled={true}>
          <span className="btn">Send message</span>
        </button>
      </div>
    </form>
  );
}
