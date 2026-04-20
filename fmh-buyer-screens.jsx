// fmh-buyer-screens.jsx — LandingBuyer, FormScreen, PremiumScreen, SuccessScreen, MyRequirements

const { useState: uS, useEffect: uE } = React;

// ── shared ───────────────────────────────────────────────────
const buyerBackBtn = { width:38, height:38, borderRadius:100, border:'1.5px solid var(--bdr)', background:'var(--surf)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 };
const buyerLabel = { display:'block', fontSize:13, fontWeight:600, color:'var(--t2)', marginBottom:8, letterSpacing:'0.01em' };
const buyerH2 = { fontSize:24, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.03em', marginBottom:8, lineHeight:1.28 };
const buyerSub = { fontSize:15, color:'var(--t2)', marginBottom:22, lineHeight:1.65 };

function Chip({ active, onClick, children, small }) {
  return (
    <button onClick={onClick} style={{
      padding: small ? '8px 13px' : '10px 16px', borderRadius:100, whiteSpace:'nowrap',
      border:'1.5px solid', borderColor: active ? 'var(--accent)' : 'var(--bdr)',
      background: active ? 'var(--accent-l)' : 'var(--surf)',
      fontSize: small ? 13 : 14, fontWeight:500, cursor:'pointer', fontFamily:'inherit',
      color: active ? 'var(--accent)' : 'var(--t2)', transition:'all 0.18s',
    }}>{children}</button>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={onChange} style={{ width:44, height:26, borderRadius:100, position:'relative', cursor:'pointer', background: on ? 'var(--accent)' : 'var(--bdr)', transition:'background 0.22s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:3, left: on ? 21 : 3, width:20, height:20, borderRadius:100, background:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.2)', transition:'left 0.22s cubic-bezier(0.34,1.56,0.64,1)' }}/>
    </div>
  );
}

// ── Landing (Buyer, logged in) ───────────────────────────────
function LandingBuyerScreen({ userName, onPost, onViewReqs, onViewNotifs }) {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div data-screen-label="04 Home" style={{ flex:1, overflowY:'auto', background:'var(--bg)', paddingBottom:80 }}>
      <div style={{ padding:'22px 22px 0' }}>
        {/* Greeting */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
          <div>
            <div style={{ fontSize:13, color:'var(--t3)', fontWeight:500 }}>{greet}</div>
            <div style={{ fontSize:22, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.02em' }}>{userName} 👋</div>
          </div>
          <div onClick={onViewNotifs} style={{ width:42, height:42, borderRadius:100, background:'var(--surf)', border:'1px solid var(--bdr)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative' }}>
            <Icon name="bell" size={20} color="var(--t2)"/>
            <div style={{ position:'absolute', top:9, right:10, width:8, height:8, borderRadius:100, background:'var(--accent)', border:'2px solid var(--bg)' }}/>
          </div>
        </div>

        {/* Post CTA card */}
        <div onClick={onPost} style={{
          borderRadius:18, padding:'22px', marginBottom:16, cursor:'pointer',
          background:`linear-gradient(135deg, var(--accent), var(--accent-m))`,
          boxShadow:`0 10px 40px color-mix(in srgb, var(--accent) 30%, transparent)`,
          position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', right:-20, top:-20, width:130, height:130, borderRadius:100, background:'rgba(255,255,255,0.07)' }}/>
          <div style={{ position:'absolute', right:20, bottom:-30, width:90, height:90, borderRadius:100, background:'rgba(255,255,255,0.05)' }}/>
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:'0.06em', marginBottom:8 }}>NEW REQUIREMENT</div>
            <div style={{ fontSize:20, fontWeight:700, color:'white', lineHeight:1.3, marginBottom:18 }}>Find your next home — post now</div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'9px 16px', borderRadius:100, background:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)' }}>
              <Icon name="plus" size={14} color="white"/>
              <span style={{ fontSize:14, fontWeight:600, color:'white' }}>Post Requirement</span>
            </div>
          </div>
        </div>

        {/* Active requirement */}
        <div style={{ fontSize:13, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:12 }}>ACTIVE REQUIREMENTS</div>
        {MOCK_REQUIREMENTS.filter(r => r.status === 'active').map(r => (
          <div key={r.id} onClick={onViewReqs} style={{ background:'var(--surf)', borderRadius:14, border:'1px solid var(--bdr)', padding:'16px', marginBottom:10, cursor:'pointer' }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--t1)' }}>{r.type}</div>
                <div style={{ fontSize:13, color:'var(--t3)', marginTop:2 }}>{r.area} · {r.budget}</div>
              </div>
              {r.priority && (
                <div style={{ display:'flex', alignItems:'center', gap:4, padding:'4px 9px', borderRadius:100, background:'linear-gradient(90deg, var(--accent-l), var(--trust-l))', border:'1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                  <Icon name="sparkle" size={11} color="var(--accent)"/>
                  <span style={{ fontSize:11, fontWeight:700, color:'var(--accent)' }}>Priority</span>
                </div>
              )}
            </div>
            <div style={{ display:'flex', gap:16 }}>
              {[{ val:r.brokerViews, label:'Broker views' }, { val:r.calls, label:'Calls booked' }].map(({val,label}) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ fontSize:18, fontWeight:700, color:'var(--accent)' }}>{val}</div>
                  <div style={{ fontSize:12, color:'var(--t3)' }}>{label}</div>
                </div>
              ))}
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:4 }}>
                <div style={{ width:7, height:7, borderRadius:100, background:'var(--trust)' }}/>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--trust)' }}>Live</span>
              </div>
            </div>
          </div>
        ))}

        {/* Stats */}
        <div style={{ display:'flex', gap:10, marginTop:8 }}>
          {[{ n:'2,400+', l:'Families matched' }, { n:'47 min', l:'Avg response' }, { n:'98%', l:'No-spam rate' }].map(({n,l}) => (
            <div key={l} style={{ flex:1, background:'var(--surf)', borderRadius:14, border:'1px solid var(--bdr)', padding:'14px 12px', textAlign:'center' }}>
              <div style={{ fontSize:18, fontWeight:700, color:'var(--accent)', letterSpacing:'-0.02em' }}>{n}</div>
              <div style={{ fontSize:11, color:'var(--t3)', marginTop:3, lineHeight:1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── My Requirements ──────────────────────────────────────────
function MyRequirementsScreen({ onPost, onBack }) {
  const [tab, setTab] = uS('active');
  const filtered = MOCK_REQUIREMENTS.filter(r => tab === 'all' || r.status === tab);

  return (
    <div data-screen-label="05 My Requirements" style={{ flex:1, overflowY:'auto', background:'var(--bg)', paddingBottom:80 }}>
      <div style={{ padding:'22px 22px 0' }}>
        <div style={{ fontSize:22, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.02em', marginBottom:18 }}>My Requirements</div>
        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          {[['active','Active'],['closed','Closed'],['all','All']].map(([v,l]) => <Chip key={v} active={tab===v} onClick={()=>setTab(v)} small>{l}</Chip>)}
        </div>

        {filtered.map(r => (
          <div key={r.id} style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'18px', marginBottom:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:'var(--t1)' }}>{r.type}</div>
                <div style={{ fontSize:13, color:'var(--t3)', marginTop:3 }}>{r.area} · {r.budget} · {r.timeline}</div>
              </div>
              <div style={{ padding:'4px 11px', borderRadius:100, background: r.status==='active' ? 'var(--trust-l)' : 'var(--bdr)', fontSize:12, fontWeight:600, color: r.status==='active' ? 'var(--trust)' : 'var(--t3)' }}>
                {r.status==='active' ? 'Active' : 'Closed'}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
              {[{ icon:'eye', val:`${r.brokerViews} views`, sub:'Broker views' }, { icon:'phone', val:`${r.calls} calls`, sub:'Calls booked' }].map(({icon,val,sub}) => (
                <div key={sub} style={{ background:'var(--bg)', borderRadius:10, padding:'11px 13px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                    <Icon name={icon} size={14} color="var(--accent)"/>
                    <span style={{ fontSize:15, fontWeight:700, color:'var(--t1)' }}>{val}</span>
                  </div>
                  <div style={{ fontSize:11, color:'var(--t3)' }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:11, color:'var(--t3)', marginBottom:12 }}>Posted {r.postedAt}</div>
            <div style={{ display:'flex', gap:8 }}>
              {r.status === 'active' ? (
                <button style={{ flex:1, padding:'11px', borderRadius:11, border:'none', background:'var(--accent)', color:'white', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  View Matches
                </button>
              ) : (
                <button onClick={onPost} style={{ flex:1, padding:'11px', borderRadius:11, border:'1.5px solid var(--bdr)', background:'transparent', color:'var(--accent)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  Re-post Requirement
                </button>
              )}
            </div>
          </div>
        ))}

        <button onClick={onPost} style={{ width:'100%', padding:'15px', borderRadius:14, border:'none', background:'var(--accent)', color:'white', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit', marginTop:6, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <Icon name="plus" size={16} color="white"/>
          Post New Requirement
        </button>
      </div>
    </div>
  );
}

// ── Requirement Form (5 steps) ───────────────────────────────
const FORM_STEPS = ['Property','Budget','Preferences','Timeline','Contact'];

function FormScreen({ onComplete, onBack }) {
  const [step, setStep] = uS(0);
  const [data, setData] = uS({ type:'', city:'', area:'', budget:55, budgetUnit:'L', furnishing:'', parking:false, facing:'', timeline:'', name:'', phone:'' });
  const set = (k,v) => setData(d => ({...d,[k]:v}));

  const canNext = [
    data.type && data.city,
    true,
    true,
    data.timeline,
    data.name.length > 1 && data.phone.length === 10,
  ][step];

  const go = (dir) => {
    if (dir < 0) { step === 0 ? onBack() : setStep(s=>s-1); }
    else { step < 4 ? setStep(s=>s+1) : onComplete(data); }
  };

  const steps = [
    <div key="s0">
      <h2 style={buyerH2}>What are you looking for?</h2>
      <p style={buyerSub}>Tell us the property type and location.</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:22 }}>
        {['Flat / Apartment','Independent House','Villa','Plot','PG / Hostel','Office Space'].map(t => (
          <Chip key={t} active={data.type===t} onClick={()=>set('type',t)}>{t}</Chip>
        ))}
      </div>
      <div style={{ marginBottom:14 }}>
        <label style={buyerLabel}>City</label>
        <select value={data.city} onChange={e=>set('city',e.target.value)} style={{ width:'100%', padding:'14px 16px', border:'1.5px solid', borderColor: data.city ? 'var(--accent)' : 'var(--bdr)', borderRadius:12, fontSize:15, fontFamily:'inherit', background:'var(--surf)', color: data.city ? 'var(--t1)' : 'var(--t3)', outline:'none', boxSizing:'border-box' }}>
          <option value="">Select city…</option>
          {['Mumbai','Delhi / NCR','Bengaluru','Hyderabad','Pune','Chennai','Ahmedabad','Kolkata'].map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label style={buyerLabel}>Preferred area / locality</label>
        <input value={data.area} onChange={e=>set('area',e.target.value)} placeholder="e.g. Koramangala, Whitefield…" style={{ width:'100%', padding:'14px 16px', border:'1.5px solid var(--bdr)', borderRadius:12, fontSize:15, fontFamily:'inherit', background:'var(--surf)', color:'var(--t1)', outline:'none', boxSizing:'border-box' }}/>
      </div>
    </div>,

    <div key="s1">
      <h2 style={buyerH2}>What's your budget?</h2>
      <p style={buyerSub}>We'll only connect you with matching brokers.</p>
      <div style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'22px 20px', marginBottom:20, textAlign:'center' }}>
        <div style={{ fontSize:42, fontWeight:700, color:'var(--accent)', letterSpacing:'-0.03em', marginBottom:4 }}>₹{data.budget}{data.budgetUnit}</div>
        <div style={{ fontSize:13, color:'var(--t3)', marginBottom:18 }}>{data.budgetUnit==='L' ? `${data.budget} Lakh` : `${data.budget} Crore`}</div>
        <input type="range" min={data.budgetUnit==='L'?10:1} max={data.budgetUnit==='L'?200:10} value={data.budget} onChange={e=>set('budget',Number(e.target.value))} style={{ width:'100%', accentColor:'var(--accent)', cursor:'pointer', height:5 }}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--t3)', marginTop:8 }}>
          <span>{data.budgetUnit==='L'?'₹10L':'₹1Cr'}</span><span>{data.budgetUnit==='L'?'₹2Cr':'₹10Cr'}</span>
        </div>
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['L','Lakh'],['Cr','Crore']].map(([u,l])=><Chip key={u} active={data.budgetUnit===u} onClick={()=>{set('budgetUnit',u);set('budget',u==='L'?55:2);}}>{l}</Chip>)}
      </div>
    </div>,

    <div key="s2">
      <h2 style={buyerH2}>Any preferences?</h2>
      <p style={buyerSub}>These help us find better matches for you.</p>
      <div style={{ marginBottom:18 }}>
        <label style={buyerLabel}>Furnishing</label>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>{['Unfurnished','Semi-furnished','Fully furnished'].map(f=><Chip key={f} active={data.furnishing===f} onClick={()=>set('furnishing',f)}>{f}</Chip>)}</div>
      </div>
      <div style={{ marginBottom:18 }}>
        <label style={buyerLabel}>Facing (optional)</label>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>{['North','South','East','West','Any'].map(f=><Chip key={f} active={data.facing===f} onClick={()=>set('facing',f)}>{f}</Chip>)}</div>
      </div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'15px 16px', borderRadius:12, background:'var(--surf)', border:'1px solid var(--bdr)', cursor:'pointer' }} onClick={()=>set('parking',!data.parking)}>
        <div><div style={{ fontSize:14, fontWeight:600, color:'var(--t1)' }}>Parking required</div><div style={{ fontSize:12, color:'var(--t3)', marginTop:2 }}>At least one covered spot</div></div>
        <Toggle on={data.parking} onChange={()=>set('parking',!data.parking)}/>
      </div>
    </div>,

    <div key="s3">
      <h2 style={buyerH2}>When do you need to move?</h2>
      <p style={buyerSub}>Timeline helps brokers prioritise your lead.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {[
          { val:'7',        label:'Within 7 days',       badge:'Fastest response' },
          { val:'15',       label:'Within 15 days',      badge:'High urgency' },
          { val:'30',       label:'Within a month' },
          { val:'60',       label:'1–2 months' },
          { val:'flexible', label:'Flexible / Exploring' },
        ].map(({val,label,badge}) => (
          <div key={val} onClick={()=>set('timeline',val)} style={{ display:'flex', alignItems:'center', padding:'15px 16px', borderRadius:14, border:'1.5px solid', borderColor: data.timeline===val ? 'var(--accent)' : 'var(--bdr)', background: data.timeline===val ? 'var(--accent-l)' : 'var(--surf)', cursor:'pointer', transition:'all 0.18s' }}>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:14, fontWeight:600, color:'var(--t1)' }}>{label}</span>
                {badge && <span style={{ fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:100, background:'var(--trust-l)', color:'var(--trust)' }}>{badge}</span>}
              </div>
            </div>
            <div style={{ width:20, height:20, borderRadius:100, border:'2px solid', borderColor: data.timeline===val ? 'var(--accent)' : 'var(--bdr)', background: data.timeline===val ? 'var(--accent)' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.18s', flexShrink:0 }}>
              {data.timeline===val && <div style={{ width:8,height:8,borderRadius:100,background:'white' }}/>}
            </div>
          </div>
        ))}
      </div>
    </div>,

    <div key="s4">
      <h2 style={buyerH2}>Almost there.</h2>
      <p style={buyerSub}>Your number is shared only with matched brokers.</p>
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'11px 14px', borderRadius:11, background:'var(--trust-l)', marginBottom:22 }}>
        <Icon name="lock" size={15} color="var(--trust)"/>
        <span style={{ fontSize:13, color:'var(--trust)', fontWeight:500 }}>Max 3 brokers will receive your number.</span>
      </div>
      <div style={{ marginBottom:14 }}>
        <label style={buyerLabel}>Your name</label>
        <input value={data.name} onChange={e=>set('name',e.target.value)} placeholder="Rahul Sharma" style={{ width:'100%', padding:'14px 16px', border:'1.5px solid var(--bdr)', borderRadius:12, fontSize:15, fontFamily:'inherit', background:'var(--surf)', color:'var(--t1)', outline:'none', boxSizing:'border-box' }}/>
      </div>
      <div>
        <label style={buyerLabel}>Mobile number</label>
        <div style={{ position:'relative' }}>
          <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:15, fontWeight:600, color:'var(--t2)' }}>+91</span>
          <input value={data.phone} onChange={e=>set('phone',e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="98765 43210" inputMode="numeric" style={{ width:'100%', padding:'14px 14px 14px 50px', border:'1.5px solid var(--bdr)', borderRadius:12, fontSize:15, fontFamily:'inherit', background:'var(--surf)', color:'var(--t1)', outline:'none', boxSizing:'border-box' }}/>
        </div>
      </div>
      <p style={{ fontSize:12, color:'var(--t3)', marginTop:14, lineHeight:1.6, textAlign:'center' }}>By submitting, you agree to our Terms. We'll never sell your data.</p>
    </div>,
  ];

  return (
    <div data-screen-label="06 Post Requirement" style={{ flex:1, display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <div style={{ padding:'20px 22px 18px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:0 }}>
          <button onClick={()=>go(-1)} style={buyerBackBtn}><Icon name="chevron_l" size={18} color="var(--t2)"/></button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, color:'var(--t3)', fontWeight:500, marginBottom:6 }}>Step {step+1} of {FORM_STEPS.length} — {FORM_STEPS[step]}</div>
            <div style={{ height:3, background:'var(--bdr)', borderRadius:100, overflow:'hidden' }}>
              <div style={{ height:'100%', background:'var(--accent)', borderRadius:100, width:`${((step+1)/FORM_STEPS.length)*100}%`, transition:'width 0.4s cubic-bezier(0.32,0.72,0,1)' }}/>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'4px 22px 100px' }}>
        <div style={{ animation:'fmhFadeUp 0.32s ease' }}>{steps[step]}</div>
      </div>
      <div style={{ padding:'14px 22px 32px', background:'linear-gradient(to bottom, transparent, var(--bg) 30%)' }}>
        <button onClick={()=>go(1)} disabled={!canNext} style={{ width:'100%', padding:'16px', borderRadius:14, border:'none', background:'var(--accent)', color:'white', fontSize:16, fontWeight:600, cursor: canNext ? 'pointer' : 'default', fontFamily:'inherit', opacity: canNext ? 1 : 0.36, transition:'opacity 0.2s' }}>
          {step === 4 ? 'Submit Requirement' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}

// ── Premium Qualification ────────────────────────────────────
function PremiumScreen({ onAccept, onSkip }) {
  const [ready, setReady] = uS(null);
  const [calls, setCalls] = uS(null);
  const [confirm, setConfirm] = uS(false);
  const ok = ready && calls && confirm;

  return (
    <div data-screen-label="07 Priority Matching" style={{ flex:1, display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <div style={{ flex:1, overflowY:'auto', padding:'22px 22px 100px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'7px 13px', borderRadius:100, background:`linear-gradient(90deg, var(--accent), var(--accent-m))`, marginBottom:22 }}>
          <Icon name="sparkle" size={13} color="white"/>
          <span style={{ fontSize:11, fontWeight:700, color:'white', letterSpacing:'0.05em' }}>PRIORITY MATCHING</span>
        </div>
        <h2 style={{ fontSize:26, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.03em', lineHeight:1.22, marginBottom:12 }}>You're eligible for<br/><span style={{ color:'var(--accent)' }}>priority matching.</span></h2>
        <p style={{ fontSize:15, color:'var(--t2)', lineHeight:1.65, marginBottom:28 }}>Answer 3 quick questions. Priority leads get 3× faster responses from top brokers.</p>

        {[
          { label:'Ready to move in within 7–15 days?', opts:[['yes','Yes, ready'],['no','Not yet']], val:ready, set:setReady },
          { label:'Open to broker calls today?', opts:[['yes','Call me today'],['later','Later this week']], val:calls, set:setCalls },
        ].map(({label,opts,val,set},qi) => (
          <div key={qi} style={{ marginBottom:18 }}>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--t1)', marginBottom:12 }}>{label}</div>
            <div style={{ display:'flex', gap:10 }}>
              {opts.map(([v,l]) => (
                <button key={v} onClick={()=>set(v)} style={{ flex:1, padding:'13px', borderRadius:12, border:'1.5px solid', borderColor: val===v ? 'var(--accent)' : 'var(--bdr)', background: val===v ? 'var(--accent-l)' : 'var(--surf)', fontSize:14, fontWeight:600, color: val===v ? 'var(--accent)' : 'var(--t2)', cursor:'pointer', fontFamily:'inherit', transition:'all 0.18s' }}>{l}</button>
              ))}
            </div>
          </div>
        ))}

        <div onClick={()=>setConfirm(c=>!c)} style={{ display:'flex', alignItems:'center', gap:12, padding:'15px 16px', borderRadius:13, background:'var(--surf)', border:'1px solid var(--bdr)', cursor:'pointer', marginBottom:22 }}>
          <div style={{ width:22, height:22, borderRadius:7, border:'2px solid', borderColor: confirm ? 'var(--accent)' : 'var(--bdr)', background: confirm ? 'var(--accent)' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.18s', flexShrink:0 }}>
            {confirm && <Icon name="check" size={13} color="white"/>}
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--t1)' }}>My budget is accurate</div>
            <div style={{ fontSize:12, color:'var(--t3)', marginTop:2 }}>Helps brokers avoid mismatched leads</div>
          </div>
        </div>

        <div style={{ padding:'16px', borderRadius:14, background:'var(--accent-l)', display:'flex', gap:12, alignItems:'flex-start' }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon name="trending" size={16} color="white"/>
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:'var(--accent)', marginBottom:4 }}>Priority boost included</div>
            <div style={{ fontSize:13, color:'var(--t2)', lineHeight:1.5 }}>Shown to verified brokers before standard leads. Avg response: <strong>23 min</strong></div>
          </div>
        </div>
      </div>
      <div style={{ padding:'14px 22px 32px', display:'flex', flexDirection:'column', gap:10 }}>
        <button onClick={onAccept} disabled={!ok} style={{ width:'100%', padding:'16px', borderRadius:14, border:'none', background:'var(--accent)', color:'white', fontSize:16, fontWeight:600, cursor: ok ? 'pointer' : 'default', fontFamily:'inherit', opacity: ok ? 1 : 0.36 }}>Activate Priority ✦</button>
        <button onClick={onSkip} style={{ width:'100%', padding:'14px', borderRadius:14, border:'1.5px solid var(--bdr)', background:'transparent', color:'var(--t2)', fontSize:15, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>Submit as standard lead</button>
      </div>
    </div>
  );
}

// ── Success ──────────────────────────────────────────────────
function SuccessScreen({ isPriority, onDone }) {
  const [show, setShow] = uS(false);
  uE(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <div data-screen-label="08 Success" style={{ flex:1, display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <div style={{ flex:1, overflowY:'auto', padding:'22px 22px 100px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
        <div style={{ width:80, height:80, borderRadius:100, background: isPriority ? `linear-gradient(135deg, var(--accent), var(--trust))` : 'var(--trust-l)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:22, marginTop:32, transform: show ? 'scale(1)' : 'scale(0.55)', opacity: show ? 1 : 0, transition:'all 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <Icon name="check_circle" size={40} color={isPriority ? 'white' : 'var(--trust)'}/>
        </div>

        {isPriority && (
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:100, background:`linear-gradient(90deg, var(--accent), var(--trust))`, marginBottom:14, opacity: show ? 1 : 0, transition:'opacity 0.4s ease 0.3s' }}>
            <Icon name="sparkle" size={12} color="white"/>
            <span style={{ fontSize:11, fontWeight:700, color:'white', letterSpacing:'0.05em' }}>PRIORITY LEAD ACTIVE</span>
          </div>
        )}

        <h2 style={{ fontSize:26, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.03em', lineHeight:1.25, marginBottom:12, opacity: show ? 1 : 0, transition:'opacity 0.4s ease 0.2s' }}>Your request is live.</h2>
        <p style={{ fontSize:15, color:'var(--t2)', lineHeight:1.7, maxWidth:280, marginBottom:30, opacity: show ? 1 : 0, transition:'opacity 0.4s ease 0.25s' }}>
          {isPriority ? 'Your requirement has been shared with 3 top verified brokers. Expect a call within 30 minutes.' : 'We\'ve sent your requirement to matching verified brokers in your area.'}
        </p>

        <div style={{ width:'100%', background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'18px', marginBottom:14, textAlign:'left', opacity: show ? 1 : 0, transition:'opacity 0.5s ease 0.4s' }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:14 }}>WHAT HAPPENS NEXT</div>
          {[
            { icon:'check_circle', label:'Requirement submitted', sub:'Just now', done:true },
            { icon:'badge', label:'Brokers reviewing your post', sub: isPriority ? 'In progress' : 'Starting shortly', active:true },
            { icon:'phone', label:'Verified broker calls you', sub: isPriority ? '~30 min' : 'Within a few hours' },
            { icon:'home', label:'Schedule site visits', sub:'At your convenience' },
          ].map(({icon,label,sub,done,active},i) => (
            <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom: i<3 ? 14 : 0 }}>
              <div style={{ width:30, height:30, borderRadius:100, flexShrink:0, background: done ? 'var(--trust)' : active ? 'var(--accent-l)' : 'var(--bdr)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name={icon} size={14} color={done ? 'white' : active ? 'var(--accent)' : 'var(--t3)'}/>
              </div>
              <div style={{ paddingTop:3 }}>
                <div style={{ fontSize:14, fontWeight:600, color: done||active ? 'var(--t1)' : 'var(--t3)' }}>{label}</div>
                <div style={{ fontSize:12, color:'var(--t3)', marginTop:2 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ width:'100%', padding:'13px 15px', borderRadius:12, background:'var(--trust-l)', display:'flex', gap:9, alignItems:'center', textAlign:'left' }}>
          <Icon name="lock" size={15} color="var(--trust)"/>
          <span style={{ fontSize:13, color:'var(--trust)', fontWeight:500, lineHeight:1.5 }}>Max 3 brokers received your number. No spam, no cold calls.</span>
        </div>
      </div>
      <div style={{ padding:'14px 22px 32px' }}>
        <button onClick={onDone} style={{ width:'100%', padding:'16px', borderRadius:14, border:'none', background:'var(--accent)', color:'white', fontSize:16, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Back to Home</button>
      </div>
    </div>
  );
}

Object.assign(window, { LandingBuyerScreen, MyRequirementsScreen, FormScreen, PremiumScreen, SuccessScreen, Chip, Toggle });
