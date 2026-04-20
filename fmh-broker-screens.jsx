// fmh-broker-screens.jsx — Dashboard, LeadDetail, ContactReveal, BrokerProfile

const { useState: bS, useEffect: bE } = React;

const bkBtn = { width:38, height:38, borderRadius:100, border:'1.5px solid var(--bdr)', background:'var(--surf)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 };

// ── Broker Dashboard ─────────────────────────────────────────
function BrokerDashboard({ onLeadTap, onProfile }) {
  const [accepted, setAccepted] = bS([]);
  const [filter, setFilter] = bS('all');
  const [credits, setCredits] = bS(12);

  const filtered = MOCK_LEADS.filter(l =>
    filter === 'all' || (filter === 'priority' && l.priority) ||
    (filter === 'bengaluru' && l.city === 'Bengaluru') ||
    (filter === 'mumbai' && l.city === 'Mumbai')
  );

  return (
    <div data-screen-label="09 Broker Leads" style={{ height:'100%', overflowY:'auto', background:'var(--bg)', paddingBottom:80 }}>
      <div style={{ padding:'22px 22px 0' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
          <div>
            <div style={{ fontSize:13, color:'var(--t3)', fontWeight:500 }}>Broker Portal</div>
            <div style={{ fontSize:22, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.02em' }}>Live Leads</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 12px', borderRadius:100, background:'var(--trust-l)' }}>
              <div style={{ width:7, height:7, borderRadius:100, background:'var(--trust)' }}/>
              <span style={{ fontSize:12, fontWeight:600, color:'var(--trust)' }}>Live</span>
            </div>
            <div onClick={onProfile} style={{ width:38, height:38, borderRadius:100, background:'var(--accent-l)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1.5px solid var(--bdr)' }}>
              <span style={{ fontSize:14, fontWeight:700, color:'var(--accent)' }}>R</span>
            </div>
          </div>
        </div>

        {/* Credits bar */}
        <div style={{ background:'var(--surf)', borderRadius:14, border:'1px solid var(--bdr)', padding:'13px 16px', marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>
          <Icon name="credit" size={18} color="var(--accent)"/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--t1)' }}>{credits} credits remaining</div>
            <div style={{ fontSize:11, color:'var(--t3)', marginTop:1 }}>Each accepted lead costs 2 credits</div>
          </div>
          <button style={{ padding:'8px 14px', borderRadius:100, border:'none', background:'var(--accent)', color:'white', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Top up</button>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginBottom:18 }}>
          {[
            { val:'4', label:'New today', color:'var(--accent)' },
            { val:'2', label:'Priority', color:'var(--trust)' },
            { val: accepted.length.toString(), label:'Accepted', color:'var(--t2)' },
            { val: credits.toString(), label:'Credits', color:'var(--accent-m)' },
          ].map(({val,label,color}) => (
            <div key={label} style={{ background:'var(--surf)', borderRadius:12, border:'1px solid var(--bdr)', padding:'11px 10px', textAlign:'center' }}>
              <div style={{ fontSize:20, fontWeight:700, color, letterSpacing:'-0.02em' }}>{val}</div>
              <div style={{ fontSize:10, color:'var(--t3)', marginTop:2, fontWeight:500, lineHeight:1.3 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4, marginBottom:16, scrollbarWidth:'none' }}>
          {[['all','All Leads'],['priority','⚡ Priority'],['bengaluru','Bengaluru'],['mumbai','Mumbai']].map(([v,l]) => (
            <Chip key={v} active={filter===v} onClick={()=>setFilter(v)} small>{l}</Chip>
          ))}
        </div>

        {/* Lead cards */}
        {filtered.map(lead => {
          const isAccepted = accepted.includes(lead.id);
          return (
            <div key={lead.id} onClick={() => !isAccepted && onLeadTap(lead)} style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'16px', marginBottom:12, cursor: isAccepted ? 'default' : 'pointer', transition:'all 0.18s' }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <div style={{ width:38, height:38, borderRadius:100, background:'var(--accent-l)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'var(--accent)', flexShrink:0 }}>{lead.initials}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:'var(--t1)' }}>{lead.initials[0]}*** {lead.name.split(' ')[1]?.[0]}.</div>
                    <div style={{ fontSize:11, color:'var(--t3)' }}>{lead.time}</div>
                  </div>
                </div>
                {lead.priority && (
                  <div style={{ display:'flex', alignItems:'center', gap:4, padding:'4px 9px', borderRadius:100, background:'linear-gradient(90deg, var(--accent-l), var(--trust-l))', border:'1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                    <Icon name="sparkle" size={11} color="var(--accent)"/>
                    <span style={{ fontSize:11, fontWeight:700, color:'var(--accent)' }}>Priority</span>
                  </div>
                )}
              </div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
                {[
                  { label: lead.type, icon:'home' },
                  { label: `${lead.area}, ${lead.city}`, icon:'map_pin' },
                  { label: lead.budget, icon:'credit' },
                  { label: `${lead.timeline}`, icon:'clock' },
                ].map(({label,icon}) => (
                  <div key={label} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:100, background:'var(--bg)', fontSize:12, color:'var(--t2)', fontWeight:500 }}>
                    <Icon name={icon} size={11} color="var(--t3)"/>{label}
                  </div>
                ))}
              </div>

              {isAccepted ? (
                <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px', borderRadius:11, background:'var(--trust-l)', fontSize:13, fontWeight:600, color:'var(--trust)' }}>
                  <Icon name="check" size={15} color="var(--trust)"/>Contact unlocked · Tap to call
                </div>
              ) : (
                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={e=>{e.stopPropagation();onLeadTap(lead);}} style={{ flex:1, padding:'12px', borderRadius:11, border:'none', background:'var(--accent)', color:'white', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>View &amp; Accept →</button>
                  <div style={{ padding:'12px 14px', borderRadius:11, border:'1px solid var(--bdr)', background:'var(--bg)', display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--t3)' }}>
                    <Icon name="credit" size={13} color="var(--t3)"/>2
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ padding:'14px 16px', borderRadius:12, background:'var(--accent-l)', textAlign:'center', marginTop:4 }}>
          <div style={{ fontSize:13, fontWeight:500, color:'var(--accent)', lineHeight:1.6 }}>Contact details revealed only after accepting. Brokers are held to a <strong>no-spam policy.</strong></div>
        </div>
      </div>
    </div>
  );
}

// ── Lead Detail ──────────────────────────────────────────────
function LeadDetailScreen({ lead, onAccept, onBack }) {
  const [accepted, setAccepted] = bS(false);

  const doAccept = () => {
    setAccepted(true);
    setTimeout(() => onAccept(lead), 600);
  };

  return (
    <div data-screen-label="10 Lead Detail" style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <div style={{ padding:'20px 22px 14px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid var(--bdr)', background:'var(--surf)' }}>
        <button onClick={onBack} style={bkBtn}><Icon name="chevron_l" size={18} color="var(--t2)"/></button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:16, fontWeight:700, color:'var(--t1)' }}>Lead Detail</div>
          <div style={{ fontSize:12, color:'var(--t3)' }}>{lead.time}</div>
        </div>
        {lead.priority && (
          <div style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 11px', borderRadius:100, background:`linear-gradient(90deg, var(--accent), var(--accent-m))` }}>
            <Icon name="sparkle" size={12} color="white"/>
            <span style={{ fontSize:11, fontWeight:700, color:'white' }}>Priority</span>
          </div>
        )}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'18px 22px 100px' }}>
        {/* Buyer card */}
        <div style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'18px', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <div style={{ width:48, height:48, borderRadius:100, background:'var(--accent-l)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:700, color:'var(--accent)', flexShrink:0 }}>{lead.initials}</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:'var(--t1)' }}>
                {lead.initials[0]}*** {lead.name.split(' ')[1]?.[0]}.
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
                {lead.verified && <>
                  <Icon name="badge" size={13} color="var(--trust)"/>
                  <span style={{ fontSize:12, color:'var(--trust)', fontWeight:600 }}>Verified Buyer</span>
                </>}
                <span style={{ fontSize:12, color:'var(--t3)' }}>· {lead.time}</span>
              </div>
            </div>
          </div>

          {/* Phone teaser (blurred) */}
          <div style={{ padding:'11px 14px', borderRadius:11, background:'var(--bg)', display:'flex', alignItems:'center', gap:10, marginBottom:0 }}>
            <Icon name="phone" size={16} color="var(--t3)"/>
            <span style={{ fontSize:15, fontWeight:600, color:'var(--t3)', filter:'blur(5px)', letterSpacing:'0.05em' }}>+91 ●●●●● ●●●●●</span>
            <span style={{ marginLeft:'auto', fontSize:12, color:'var(--accent)', fontWeight:600 }}>Unlock →</span>
          </div>
        </div>

        {/* Requirement */}
        <div style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'18px', marginBottom:14 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:14 }}>REQUIREMENT</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { icon:'home',    label:'Type',       val: lead.type },
              { icon:'map_pin', label:'Location',   val: `${lead.area}, ${lead.city}` },
              { icon:'credit',  label:'Budget',     val: lead.budget },
              { icon:'clock',   label:'Timeline',   val: `Within ${lead.timeline}` },
              { icon:'deals',   label:'Furnishing', val: lead.furnishing },
              { icon:'info',    label:'Facing',     val: lead.facing || 'Any' },
            ].map(({icon,label,val}) => (
              <div key={label} style={{ background:'var(--bg)', borderRadius:10, padding:'12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:5 }}>
                  <Icon name={icon} size={13} color="var(--t3)"/>
                  <span style={{ fontSize:11, fontWeight:600, color:'var(--t3)', letterSpacing:'0.03em' }}>{label.toUpperCase()}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--t1)', lineHeight:1.4 }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Extras */}
          <div style={{ display:'flex', gap:8, marginTop:12 }}>
            {lead.parking && <div style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 11px', borderRadius:100, background:'var(--trust-l)', fontSize:12, color:'var(--trust)', fontWeight:600 }}><Icon name="check" size={12} color="var(--trust)"/>Parking needed</div>}
          </div>

          {lead.note && (
            <div style={{ marginTop:12, padding:'11px 13px', borderRadius:11, background:'var(--accent-l)' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--t3)', letterSpacing:'0.05em', marginBottom:5 }}>BUYER NOTE</div>
              <div style={{ fontSize:13, color:'var(--t2)', lineHeight:1.55 }}>{lead.note}</div>
            </div>
          )}
        </div>

        {/* Credit cost */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 16px', borderRadius:13, background:'var(--surf)', border:'1px solid var(--bdr)', marginBottom:14 }}>
          <Icon name="credit" size={18} color="var(--accent)"/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--t1)' }}>This lead costs 2 credits</div>
            <div style={{ fontSize:12, color:'var(--t3)', marginTop:1 }}>You have 12 credits remaining</div>
          </div>
          <div style={{ fontSize:18, fontWeight:700, color:'var(--accent)' }}>−2</div>
        </div>
      </div>

      <div style={{ padding:'14px 22px 32px', background:'var(--bg)' }}>
        <button onClick={doAccept} style={{
          width:'100%', padding:'16px', borderRadius:14, border:'none',
          background: accepted ? 'var(--trust)' : 'var(--accent)',
          color:'white', fontSize:16, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          transition:'background 0.3s ease',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8
        }}>
          {accepted ? <><Icon name="check" size={18} color="white"/>Accepted! Unlocking…</> : 'Accept Lead & Unlock Contact →'}
        </button>
      </div>
    </div>
  );
}

// ── Contact Reveal ───────────────────────────────────────────
function ContactRevealScreen({ lead, onBack }) {
  const [unlocked, setUnlocked] = bS(false);
  const [marked, setMarked] = bS(false);
  const [copied, setCopied] = bS(false);
  const [note, setNote] = bS('');

  bE(() => { const t = setTimeout(() => setUnlocked(true), 400); return () => clearTimeout(t); }, []);

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2200); };

  const anim = (delay = 0) => ({
    opacity: unlocked ? 1 : 0,
    transform: unlocked ? 'translateY(0)' : 'translateY(14px)',
    transition: `all 0.44s cubic-bezier(0.32,0.72,0,1) ${delay}s`,
  });

  return (
    <div data-screen-label="11 Contact Reveal" style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <div style={{ padding:'20px 22px 14px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid var(--bdr)', background:'var(--surf)' }}>
        <button onClick={onBack} style={bkBtn}><Icon name="chevron_l" size={18} color="var(--t2)"/></button>
        <div style={{ fontSize:16, fontWeight:700, color:'var(--t1)' }}>Contact Unlocked</div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'22px 22px 100px' }}>
        {/* Unlock icon */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 0 32px' }}>
          <div style={{
            width:76, height:76, borderRadius:24, marginBottom:14,
            background: unlocked ? `linear-gradient(135deg, var(--accent), var(--trust))` : 'var(--bdr)',
            display:'flex', alignItems:'center', justifyContent:'center',
            transform: unlocked ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(-15deg)',
            transition:'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: unlocked ? `0 16px 48px color-mix(in srgb, var(--accent) 35%, transparent)` : 'none',
          }}>
            <Icon name={unlocked ? 'lock_open' : 'lock'} size={34} color="white"/>
          </div>
          <div style={{ fontSize:18, fontWeight:700, color:'var(--t1)', ...anim(0.2) }}>Contact Unlocked</div>
          <div style={{ fontSize:13, color:'var(--t3)', marginTop:4, ...anim(0.25) }}>2 credits used · 10 remaining</div>
        </div>

        {/* Contact card */}
        <div style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'18px', marginBottom:14, ...anim(0.18) }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <div style={{ width:50, height:50, borderRadius:100, background:'var(--accent-l)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:700, color:'var(--accent)', flexShrink:0 }}>{lead.initials}</div>
            <div>
              <div style={{ fontSize:17, fontWeight:700, color:'var(--t1)' }}>{lead.name}</div>
              {lead.verified && (
                <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:4 }}>
                  <Icon name="badge" size={13} color="var(--trust)"/>
                  <span style={{ fontSize:12, color:'var(--trust)', fontWeight:600 }}>Verified Buyer</span>
                </div>
              )}
            </div>
          </div>

          {/* Phone */}
          <div style={{ background:'var(--accent-l)', borderRadius:12, padding:'14px 16px', marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:6 }}>MOBILE NUMBER</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ fontSize:20, fontWeight:700, color:'var(--accent)', letterSpacing:'0.03em' }}>{lead.phone}</div>
              <button onClick={copy} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 12px', borderRadius:9, border:'1px solid var(--accent)', background:'transparent', color:'var(--accent)', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'all 0.18s' }}>
                <Icon name="copy" size={13} color="var(--accent)"/>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Call / WhatsApp */}
          <div style={{ display:'flex', gap:10 }}>
            <a href={`tel:${lead.phone.replace(/\s/g,'')}`} style={{ flex:1, padding:'14px 0', borderRadius:12, textDecoration:'none', background:'var(--accent)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:14, fontWeight:600 }}>
              <Icon name="phone" size={16} color="white"/>Call Now
            </a>
            <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex:1, padding:'14px 0', borderRadius:12, textDecoration:'none', background:'#25d366', color:'white', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:14, fontWeight:600 }}>
              <Icon name="whatsapp" size={16} color="white"/>WhatsApp
            </a>
          </div>
        </div>

        {/* Requirement summary */}
        <div style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'18px', marginBottom:14, ...anim(0.3) }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:12 }}>REQUIREMENT SUMMARY</div>
          {[['Type', lead.type], ['Location', `${lead.area}, ${lead.city}`], ['Budget', lead.budget], ['Move-in', `Within ${lead.timeline}`], ['Furnishing', lead.furnishing]].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:9, marginBottom:9, borderBottom:'1px solid var(--bdr)' }}>
              <span style={{ fontSize:13, color:'var(--t3)' }}>{k}</span>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--t1)' }}>{v}</span>
            </div>
          ))}
          {lead.note ? (
            <div style={{ padding:'11px 13px', borderRadius:10, background:'var(--accent-l)' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--t3)', letterSpacing:'0.05em', marginBottom:4 }}>BUYER NOTE</div>
              <div style={{ fontSize:13, color:'var(--t2)', lineHeight:1.55 }}>{lead.note}</div>
            </div>
          ) : <div style={{ fontSize:13, color:'var(--t3)' }}>No additional notes</div>}
        </div>

        {/* Notes field */}
        <div style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', padding:'16px', marginBottom:14, ...anim(0.38) }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:10 }}>YOUR NOTES</div>
          <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add notes about this lead…" style={{ width:'100%', minHeight:72, padding:'11px 13px', borderRadius:10, border:'1.5px solid var(--bdr)', background:'var(--bg)', color:'var(--t1)', fontSize:14, fontFamily:'inherit', outline:'none', resize:'none', boxSizing:'border-box' }}/>
        </div>

        <button onClick={()=>setMarked(m=>!m)} style={{ ...anim(0.44), width:'100%', padding:'15px', borderRadius:14, border:'none', background: marked ? 'var(--trust-l)' : 'var(--accent)', color: marked ? 'var(--trust)' : 'white', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.3s ease' }}>
          <Icon name={marked ? 'check_circle' : 'phone'} size={17} color={marked ? 'var(--trust)' : 'white'}/>
          {marked ? 'Marked as Contacted ✓' : 'Mark as Contacted'}
        </button>
      </div>
    </div>
  );
}

// ── Broker Profile ───────────────────────────────────────────
function BrokerProfileScreen({ onBack, onSettings }) {
  return (
    <div data-screen-label="12 Broker Profile" style={{ height:'100%', overflowY:'auto', background:'var(--bg)', paddingBottom:80 }}>
      <div style={{ padding:'22px 22px 0' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <div style={{ fontSize:22, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.02em' }}>Profile</div>
          <button onClick={onSettings} style={{ width:38, height:38, borderRadius:100, border:'1.5px solid var(--bdr)', background:'var(--surf)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="settings" size={17} color="var(--t2)"/>
          </button>
        </div>

        {/* Avatar + details */}
        <div style={{ background:'var(--surf)', borderRadius:18, border:'1px solid var(--bdr)', padding:'22px', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:16, marginBottom:18 }}>
            <div style={{ width:66, height:66, borderRadius:22, background:`linear-gradient(135deg, var(--accent), var(--accent-m))`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:700, color:'white', flexShrink:0 }}>R</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:18, fontWeight:700, color:'var(--t1)', marginBottom:4 }}>Ramesh Kulkarni</div>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                <Icon name="badge" size={14} color="var(--trust)"/>
                <span style={{ fontSize:13, fontWeight:600, color:'var(--trust)' }}>KYC Verified Broker</span>
              </div>
              <div style={{ fontSize:13, color:'var(--t3)' }}>Bengaluru · 8 years exp.</div>
            </div>
            <button style={{ padding:'9px 14px', borderRadius:100, border:'1.5px solid var(--bdr)', background:'transparent', fontSize:13, fontWeight:600, color:'var(--t2)', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:5 }}>
              <Icon name="edit" size={13} color="var(--t2)"/>Edit
            </button>
          </div>

          {/* Stars */}
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'11px 14px', borderRadius:11, background:'var(--bg)' }}>
            <div style={{ display:'flex', gap:3 }}>
              {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={14} color={i<=5 ? '#f59e0b' : 'var(--bdr)'}/>)}
            </div>
            <span style={{ fontSize:15, fontWeight:700, color:'var(--t1)' }}>4.8</span>
            <span style={{ fontSize:13, color:'var(--t3)' }}>· 31 reviews</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:14 }}>
          {[{ val:'48', label:'Deals Closed', icon:'deals' }, { val:'~23m', label:'Avg Response', icon:'clock' }, { val:'4.8★', label:'Avg Rating', icon:'star' }].map(({val,label,icon}) => (
            <div key={label} style={{ background:'var(--surf)', borderRadius:14, border:'1px solid var(--bdr)', padding:'15px 12px', textAlign:'center' }}>
              <Icon name={icon} size={18} color="var(--accent)" style={{ margin:'0 auto 8px' }}/>
              <div style={{ fontSize:18, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.02em' }}>{val}</div>
              <div style={{ fontSize:11, color:'var(--t3)', marginTop:3, lineHeight:1.3 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div style={{ background:`linear-gradient(135deg, var(--accent), var(--accent-m))`, borderRadius:16, padding:'18px', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:'0.05em', marginBottom:4 }}>ACTIVE PLAN</div>
              <div style={{ fontSize:18, fontWeight:700, color:'white' }}>Pro Broker · 12 credits</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)', marginTop:4 }}>Renews May 20, 2026</div>
            </div>
            <Icon name="sparkle" size={32} color="rgba(255,255,255,0.4)"/>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ fontSize:13, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:12 }}>RECENT REVIEWS</div>
        {MOCK_REVIEWS.map((r,i) => (
          <div key={i} style={{ background:'var(--surf)', borderRadius:14, border:'1px solid var(--bdr)', padding:'15px', marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--t1)' }}>{r.name}</div>
                <div style={{ fontSize:11, color:'var(--t3)', marginTop:2 }}>{r.date}</div>
              </div>
              <div style={{ display:'flex', gap:2 }}>
                {[1,2,3,4,5].map(j => <Icon key={j} name="star" size={12} color={j<=r.rating ? '#f59e0b' : 'var(--bdr)'}/>)}
              </div>
            </div>
            <div style={{ fontSize:13, color:'var(--t2)', lineHeight:1.55 }}>{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { BrokerDashboard, LeadDetailScreen, ContactRevealScreen, BrokerProfileScreen });
