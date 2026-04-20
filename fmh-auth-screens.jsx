// fmh-auth-screens.jsx — Onboarding, Phone Auth, OTP Auth

const { useState, useEffect, useRef } = React;

// ── shared back button style ────────────────────────────────
const backBtn = {
  width:38, height:38, borderRadius:100,
  border:'1.5px solid var(--bdr)', background:'var(--surf)',
  cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
  flexShrink:0,
};

// ── Onboarding ──────────────────────────────────────────────
const SLIDES = [
  { icon:'home',    title:'Your next home\nis waiting.',     sub:'Post your requirement once. Verified brokers find you — no endless browsing.' },
  { icon:'badge',   title:'Only verified\nbrokers.',         sub:'Every broker is KYC-verified, rated, and held to a strict no-spam policy.' },
  { icon:'lock',    title:'Your privacy,\nalways.',          sub:'Your number shared with max 3 matched brokers. No cold calls, ever.' },
];

function OnboardingScreen({ onDone, onBroker }) {
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];
  const isLast = idx === SLIDES.length - 1;

  return (
    <div data-screen-label="01 Onboarding" style={{ flex:1, display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <div style={{ padding:'16px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="home" size={15} color="white"/>
          </div>
          <span style={{ fontSize:15, fontWeight:700, color:'var(--t1)' }}>FindMyHome</span>
        </div>
        <button onClick={onDone} style={{ background:'none', border:'none', fontSize:14, color:'var(--t3)', cursor:'pointer', fontFamily:'inherit', fontWeight:500 }}>Skip</button>
      </div>

      {/* Illustration */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 36px', gap:36 }}>
        <div style={{
          width:148, height:148, borderRadius:38,
          background:`linear-gradient(145deg, var(--accent), var(--accent-m))`,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 24px 60px color-mix(in srgb, var(--accent) 35%, transparent)`,
          transition:'all 0.42s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <Icon name={slide.icon} size={64} color="white"/>
        </div>
        <div style={{ textAlign:'center' }}>
          <h1 style={{ fontSize:30, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.03em', lineHeight:1.2, marginBottom:14, whiteSpace:'pre-line' }}>
            {slide.title}
          </h1>
          <p style={{ fontSize:15, color:'var(--t2)', lineHeight:1.7, maxWidth:270 }}>{slide.sub}</p>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding:'0 24px 44px' }}>
        <div style={{ display:'flex', justifyContent:'center', gap:7, marginBottom:28 }}>
          {SLIDES.map((_,i) => (
            <div key={i} onClick={()=>setIdx(i)} style={{
              width: i===idx ? 22 : 7, height:7, borderRadius:100,
              background: i===idx ? 'var(--accent)' : 'var(--bdr)',
              transition:'all 0.32s cubic-bezier(0.34,1.56,0.64,1)', cursor:'pointer',
            }}/>
          ))}
        </div>
        <button onClick={() => isLast ? onDone() : setIdx(i => i+1)} style={{
          width:'100%', padding:'16px', borderRadius:14,
          background:'var(--accent)', color:'white', border:'none',
          fontSize:16, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          letterSpacing:'-0.01em', marginBottom:12,
        }}>
          {isLast ? 'Get Started' : 'Continue →'}
        </button>
        <div style={{ textAlign:'center' }}>
          <span style={{ fontSize:13, color:'var(--t3)' }}>Are you a broker? </span>
          <span onClick={onBroker} style={{ fontSize:13, fontWeight:600, color:'var(--accent)', cursor:'pointer' }}>Sign in here →</span>
        </div>
      </div>
    </div>
  );
}

// ── Phone Auth ───────────────────────────────────────────────
function AuthPhoneScreen({ onContinue, onBack, userType }) {
  const [phone, setPhone] = useState('');
  const valid = phone.replace(/\D/g,'').length === 10;

  return (
    <div data-screen-label="02 Phone Auth" style={{ flex:1, display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <div style={{ padding:'56px 24px 0', flex:1 }}>
        <button onClick={onBack} style={backBtn}><Icon name="chevron_l" size={18} color="var(--t2)"/></button>
        <div style={{ marginTop:32, marginBottom:32 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 12px', borderRadius:100, background:'var(--accent-l)', marginBottom:24 }}>
            <Icon name={userType==='broker' ? 'badge' : 'shield'} size={13} color="var(--accent)"/>
            <span style={{ fontSize:12, fontWeight:600, color:'var(--accent)' }}>{userType==='broker' ? 'Broker Portal' : 'Buyer Sign Up'}</span>
          </div>
          <h2 style={{ fontSize:28, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.03em', marginBottom:10, lineHeight:1.22 }}>
            {userType==='broker' ? 'Broker sign in' : 'Enter your number'}
          </h2>
          <p style={{ fontSize:15, color:'var(--t2)', lineHeight:1.65 }}>
            {userType==='broker' ? "We'll verify your identity and connect you to live leads." : "We'll send a one-time code to verify your number."}
          </p>
        </div>

        <div style={{ position:'relative', marginBottom:10 }}>
          <span style={{ position:'absolute', left:15, top:'50%', transform:'translateY(-50%)', fontSize:15, fontWeight:600, color:'var(--t2)' }}>+91</span>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g,'').slice(0,10))}
            placeholder="98765 43210"
            inputMode="numeric"
            style={{
              width:'100%', padding:'15px 15px 15px 52px',
              border:'1.5px solid', borderColor: phone.length > 0 ? 'var(--accent)' : 'var(--bdr)',
              borderRadius:13, fontSize:16, fontFamily:'inherit',
              background:'var(--surf)', color:'var(--t1)', outline:'none',
              transition:'border-color 0.18s', boxSizing:'border-box',
              boxShadow: phone.length > 0 ? '0 0 0 3px color-mix(in srgb, var(--accent) 12%, transparent)' : 'none',
            }}
          />
        </div>
        <p style={{ fontSize:12, color:'var(--t3)', marginBottom:0, lineHeight:1.5 }}>
          By continuing you agree to our Terms &amp; Privacy Policy.
        </p>
      </div>

      <div style={{ padding:'16px 24px 44px' }}>
        <button onClick={() => valid && onContinue(phone)} style={{
          width:'100%', padding:'16px', borderRadius:14,
          background:'var(--accent)', color:'white', border:'none',
          fontSize:16, fontWeight:600, cursor: valid ? 'pointer' : 'default', fontFamily:'inherit',
          opacity: valid ? 1 : 0.38, transition:'opacity 0.2s',
        }}>Send OTP →</button>
      </div>
    </div>
  );
}

// ── OTP Auth ─────────────────────────────────────────────────
function AuthOTPScreen({ phone, onVerified, onBack }) {
  const [otp, setOtp] = useState(['','','','']);
  const [timer, setTimer] = useState(30);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => { setTimeout(() => refs[0].current?.focus(), 200); }, []);
  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer(s => s-1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val; setOtp(next);
    if (val && i < 3) setTimeout(() => refs[i+1].current?.focus(), 0);
    const full = next.join('');
    if (full.length === 4) {
      if (full !== '1234') {
        setTimeout(() => { setShake(true); setOtp(['','','','']); refs[0].current?.focus(); setTimeout(() => setShake(false), 600); }, 200);
      } else {
        setLoading(true);
        setTimeout(() => onVerified(), 700);
      }
    }
  };
  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i-1].current?.focus();
  };
  const masked = phone.replace(/(\d{5})(\d{5})/, '$1 $2');

  return (
    <div data-screen-label="03 OTP" style={{ flex:1, display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <div style={{ padding:'56px 24px 0', flex:1 }}>
        <button onClick={onBack} style={backBtn}><Icon name="chevron_l" size={18} color="var(--t2)"/></button>
        <div style={{ marginTop:32, marginBottom:36 }}>
          <h2 style={{ fontSize:28, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.03em', marginBottom:10, lineHeight:1.22 }}>Enter the code</h2>
          <p style={{ fontSize:15, color:'var(--t2)', lineHeight:1.65 }}>
            Sent to <strong style={{ color:'var(--t1)' }}>+91 {masked}</strong>
          </p>
        </div>

        {/* Boxes */}
        <div style={{
          display:'flex', gap:12, justifyContent:'center', marginBottom:24,
          animation: shake ? 'fmhShake 0.5s ease' : 'none',
        }}>
          {otp.map((d, i) => (
            <input key={i} ref={refs[i]} value={d} maxLength={1} inputMode="numeric"
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              style={{
                width:66, height:74, textAlign:'center',
                fontSize:30, fontWeight:700, color:'var(--t1)',
                border:'1.5px solid', borderColor: d ? 'var(--accent)' : 'var(--bdr)',
                borderRadius:16, background:'var(--surf)',
                fontFamily:'inherit', outline:'none',
                transition:'all 0.18s',
                boxShadow: d ? '0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Hint */}
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'11px 14px', borderRadius:11, background:'var(--accent-l)', marginBottom:28 }}>
          <Icon name="info" size={15} color="var(--accent)"/>
          <span style={{ fontSize:13, color:'var(--accent)', fontWeight:500 }}>Use <strong>1234</strong> to verify in this prototype</span>
        </div>

        {loading && (
          <div style={{ textAlign:'center', fontSize:14, color:'var(--accent)', fontWeight:600 }}>Verifying…</div>
        )}
        {!loading && (
          <div style={{ textAlign:'center' }}>
            {timer > 0
              ? <span style={{ fontSize:14, color:'var(--t3)' }}>Resend in {timer}s</span>
              : <button onClick={() => setTimer(30)} style={{ background:'none', border:'none', fontSize:14, fontWeight:600, color:'var(--accent)', cursor:'pointer', fontFamily:'inherit' }}>Resend OTP</button>
            }
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingScreen, AuthPhoneScreen, AuthOTPScreen });
