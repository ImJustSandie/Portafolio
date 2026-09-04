import React, { useState, type FormEvent } from 'react';

const WEB3FORMS_KEY = '8ed235b4-2b78-423b-b82f-500ff57c53a5';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Contacto desde Portafolio / Portfolio Contact',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full bg-p5-black border-2 border-p5-white text-p5-white font-mono text-xs md:text-sm px-3 md:px-4 py-2 md:py-3 placeholder-p5-white/30 focus:outline-none focus:border-p5-red transition-colors';

  return (
    <div className="group mt-4 md:mt-8 w-full max-w-2xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 bg-p5-black text-p5-white border-2 md:border-4 border-p5-red px-3 md:px-6 py-3 md:py-5 -skew-x-[3deg] ml-1 sm:ml-0 shadow-[4px_4px_0_0_#E50012] sm:shadow-[6px_6px_0_0_#E50012] md:shadow-[8px_8px_0_0_#E50012] mb-6">
        <div className="skew-x-[3deg]">
          <div className="font-display text-xl md:text-3xl uppercase leading-none">
            <span className="lang-es">ENVIAR MENSAJE</span>
            <span className="lang-en">SEND MESSAGE</span>
          </div>
          <p className="font-body text-xs md:text-sm opacity-80 mt-1 md:mt-2">
            <span className="lang-es">Déjame un mensaje directo a mi correo.</span>
            <span className="lang-en">Leave me a direct message to my inbox.</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative bg-p5-black border-2 md:border-4 border-p5-white p-4 sm:p-5 md:p-10 shadow-[3px_3px_0_0_#E50012] sm:shadow-[4px_4px_0_0_#E50012] md:shadow-[6px_6px_0_0_#E50012]">
        <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />

        {status === 'success' && (
          <div className="relative z-10 mb-6 bg-p5-white text-p5-black font-mono text-sm px-4 py-3 border-2 border-p5-red">
            <span className="lang-es">¡Mensaje enviado con éxito! Te responderé pronto.</span>
            <span className="lang-en">Message sent successfully! I'll get back to you soon.</span>
          </div>
        )}

        {status === 'error' && (
          <div className="relative z-10 mb-6 bg-p5-red text-p5-white font-mono text-sm px-4 py-3 border-2 border-p5-white">
            <span className="lang-es">Error al enviar. Intenta de nuevo o escríbeme directo.</span>
            <span className="lang-en">Error sending. Try again or email me directly.</span>
          </div>
        )}

        <div className="relative z-10 space-y-4 md:space-y-6">
          <div>
            <label className="block font-mono text-sm text-p5-red mb-2 tracking-wider uppercase">
              <span className="lang-es">Nombre</span>
              <span className="lang-en">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre / Your name"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block font-mono text-sm text-p5-red mb-2 tracking-wider uppercase">
              <span className="lang-es">Correo Electrónico</span>
              <span className="lang-en">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="email@ejemplo.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block font-mono text-sm text-p5-red mb-2 tracking-wider uppercase">
              <span className="lang-es">Mensaje</span>
              <span className="lang-en">Message</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Escribe tu mensaje aquí... / Write your message here..."
              className={`${inputClasses} resize-y`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="font-display text-base sm:text-lg md:text-xl bg-p5-red text-p5-white border-2 md:border-4 border-p5-black shadow-[4px_4px_0_0_#0F0F0F] sm:shadow-[6px_6px_0_0_#0F0F0F] md:shadow-[8px_8px_0_0_#0F0F0F] md:hover:-translate-y-1 md:hover:-translate-x-1 md:hover:shadow-[12px_12px_0_0_#0F0F0F] -skew-x-[6deg] px-4 md:px-8 py-2 md:py-4 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-[4px_4px_0_0_#0F0F0F] w-full md:w-auto"
          >
            <span className="inline-block skew-x-[6deg] flex items-center gap-3">
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span className="lang-es">ENVIANDO...</span>
                  <span className="lang-en">SENDING...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="lang-es">ENVIAR MENSAJE</span>
                  <span className="lang-en">SEND MESSAGE</span>
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
