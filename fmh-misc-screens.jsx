// fmh-misc-screens.jsx — Settings, Notifications

const { useState: mS } = React;

// ── Settings ─────────────────────────────────────────────────
function SettingsScreen({ onBack, onThemeChange, currentTheme, onLogout, userType }) {
  const [notifMatches, setNotifMatches] = mS(true);
  const [notifCalls,   setNotifCalls]   = mS(true);
  const [notifOffers,  setNotifOffers]  = mS(false);
  const [privacy,      setPrivacy]      = mS(true);

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:22 }}>
      <div style={{ fontSize:11, fontWeight:700, color:'var(--t3)', letterSpacing:'0.08em', marginBottom:10, paddingLeft:4 }}>{title}</div>
      <div style={{ background:'var(--surf)', borderRadius:16, border:'1px solid var(--bdr)', overflow:'hidden' }}>{children}</div>
    </div>
  );

  const Row = ({ icon, label, sub, right, onClick, last, danger }) => (
    <div onClick={onClick} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderBottom: last ? 'none' : '1px solid var(--bdr)', cursor: onClick ? 'pointer' : 'default', transition:'background 0.15s' }}>
      {icon && (
        <div style={{ width:34, height:34, borderRadius:10, background: danger ? 'color-mix(in srgb, var(--danger) 12%, transparent)' : 'var(--accent-l)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Icon name={icon} size={16} color={danger ? 'var(--danger)' : 'var(--accent)'}/>
        </div>
      )}
      <div style={{ flex:1 }}>
        <div style={{ fontSize:15, fontWeight:500, color: danger ? 'var(--danger)' : 'var(--t1)' }}>{label}</div>
        {sub && <div style={{ fontSize:12, color:'var(--t3)', marginTop:2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );

  return (
    <div data-screen-label="13 Settings" style={{ height:'100%', overflowY:'auto', background:'var(--bg)', paddingBottom:80 }}>
      <div style={{ padding:'22px 22px 0' }}>
        <div style={{ fontSize:22, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.02em', marginBottom:24 }}>Settings</div>

        {/* Account */}
        <Section title="ACCOUNT">
          <Row icon="user" label={userType === 'broker' ? 'Ramesh Kulkarni' : 'Rahul Sharma'} sub={userType === 'broker' ? 'Broker · KYC Verified' : 'Buyer account'} right={<Icon name="chevron_r" size={16} color="var(--t3)"/>} onClick={()=>{}}/>
          <Row icon="phone" label="+91 98765 43210" sub="Mobile number" right={<Icon name="chevron_r" size={16} color="var(--t3)"/>} onClick={()=>{}} last/>
        </Section>

        {/* Theme */}
        <Section title="APPEARANCE">
          <div style={{ padding:'16px' }}>
            <div style={{ fontSize:15, fontWeight:500, color:'var(--t1)', marginBottom:14 }}>Theme</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {Object.entries(THEMES).map(([key, t]) => (
                <div key={key} onClick={() => onThemeChange(key)} style={{
                  borderRadius:14, border:'2px solid', padding:'14px',
                  borderColor: currentTheme === key ? 'var(--accent)' : 'var(--bdr)',
                  background: currentTheme === key ? 'var(--accent-l)' : 'var(--bg)',
                  cursor:'pointer', transition:'all 0.2s',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <div style={{ width:24, height:24, borderRadius:8, background: t.swatch, boxShadow:`0 2px 8px ${t.swatch}55` }}/>
                    {currentTheme === key && <Icon name="check" size={14} color="var(--accent)"/>}
                  </div>
                  <div style={{ fontSize:13, fontWeight:600, color: currentTheme === key ? 'var(--accent)' : 'var(--t1)' }}>{t.name}</div>
                  <div style={{ fontSize:11, color:'var(--t3)', marginTop:2 }}>{t.isDark ? 'Dark mode' : 'Light mode'}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="NOTIFICATIONS">
          {[
            { label:'Broker matches', sub:'When a broker reviews your post', val:notifMatches, set:setNotifMatches },
            { label:'Call requests', sub:'When a broker wants to call', val:notifCalls, set:setNotifCalls },
            { label:'Offers & updates', sub:'Platform news and tips', val:notifOffers, set:setNotifOffers, last:true },
          ].map(({label,sub,val,set,last}) => (
            <Row key={label} label={label} sub={sub} last={last}
              right={<Toggle on={val} onChange={()=>set(v=>!v)}/>}
            />
          ))}
        </Section>

        {/* Privacy */}
        <Section title="PRIVACY">
          <Row icon="lock" label="Number visibility" sub="Max 3 brokers per requirement"
            right={<Toggle on={privacy} onChange={()=>setPrivacy(v=>!v)}/>}
          />
          <Row icon="shield" label="Data & Privacy policy" right={<Icon name="chevron_r" size={16} color="var(--t3)"/>} onClick={()=>{}} last/>
        </Section>

        {/* Support */}
        <Section title="SUPPORT">
          <Row icon="info" label="Help & FAQ" right={<Icon name="chevron_r" size={16} color="var(--t3)"/>} onClick={()=>{}}/>
          <Row icon="note" label="Contact support" sub="We respond within 2 hours" right={<Icon name="chevron_r" size={16} color="var(--t3)"/>} onClick={()=>{}} last/>
        </Section>

        {/* Logout */}
        <Section title="ACCOUNT ACTIONS">
          <Row icon="logout" label="Sign out" onClick={onLogout} danger last/>
        </Section>

        <div style={{ textAlign:'center', fontSize:12, color:'var(--t3)', marginBottom:24 }}>FindMyHome v2.0 · Built with ❤️ in India</div>
      </div>
    </div>
  );
}

// ── Notifications ─────────────────────────────────────────────
function NotificationsScreen({ onBack }) {
  const [notifs, setNotifs] = mS(MOCK_NOTIFS);

  const markRead = (id) => setNotifs(ns => ns.map(n => n.id===id ? {...n, read:true} : n));
  const markAll  = ()   => setNotifs(ns => ns.map(n => ({...n, read:true})));
  const unread   = notifs.filter(n => !n.read).length;

  const iconColor = (type) => type==='match' ? 'var(--accent)' : type==='call' ? 'var(--trust)' : 'var(--t3)';
  const iconBg    = (type) => type==='match' ? 'var(--accent-l)' : type==='call' ? 'var(--trust-l)' : 'var(--bdr)';

  return (
    <div data-screen-label="14 Notifications" style={{ height:'100%', overflowY:'auto', background:'var(--bg)', paddingBottom:80 }}>
      <div style={{ padding:'22px 22px 0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:700, color:'var(--t1)', letterSpacing:'-0.02em' }}>Notifications</div>
            {unread > 0 && <div style={{ fontSize:13, color:'var(--t3)', marginTop:2 }}>{unread} unread</div>}
          </div>
          {unread > 0 && (
            <button onClick={markAll} style={{ background:'none', border:'none', fontSize:13, fontWeight:600, color:'var(--accent)', cursor:'pointer', fontFamily:'inherit' }}>Mark all read</button>
          )}
        </div>

        {notifs.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--t3)', fontSize:15 }}>No notifications yet</div>
        )}

        {notifs.map(n => (
          <div key={n.id} onClick={()=>markRead(n.id)} style={{
            display:'flex', gap:13, padding:'15px', borderRadius:14, marginBottom:10, cursor:'pointer',
            background: n.read ? 'var(--surf)' : 'var(--accent-l)',
            border:'1px solid', borderColor: n.read ? 'var(--bdr)' : 'color-mix(in srgb, var(--accent) 20%, transparent)',
            transition:'all 0.2s',
          }}>
            <div style={{ width:38, height:38, borderRadius:12, background: iconBg(n.type), display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name={n.icon} size={17} color={iconColor(n.type)}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                <div style={{ fontSize:14, fontWeight: n.read ? 500 : 700, color:'var(--t1)', flex:1, paddingRight:8 }}>{n.title}</div>
                {!n.read && <div style={{ width:8, height:8, borderRadius:100, background:'var(--accent)', flexShrink:0, marginTop:4 }}/>}
              </div>
              <div style={{ fontSize:13, color:'var(--t2)', lineHeight:1.5, marginBottom:5 }}>{n.body}</div>
              <div style={{ fontSize:11, color:'var(--t3)' }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { SettingsScreen, NotificationsScreen });
