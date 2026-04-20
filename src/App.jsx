import { useState, useEffect, useCallback } from 'react';
import { OnboardingScreen, AuthPhoneScreen, AuthOTPScreen } from './components/fmh-auth-screens';
import { LandingBuyerScreen, MyRequirementsScreen, FormScreen, PremiumScreen, SuccessScreen } from './components/fmh-buyer-screens';
import { BrokerDashboard, LeadDetailScreen, ContactRevealScreen, BrokerProfileScreen } from './components/fmh-broker-screens';
import { SettingsScreen, NotificationsScreen } from './components/fmh-misc-screens';
import { THEMES, applyTheme, MOCK_LEADS } from './data/fmh-data';
import { Icon } from './components/fmh-icons';
import './index.css';

const BUYER_TABS  = [
  { id:'home',     icon:'home',     label:'Home'      },
  { id:'reqs',     icon:'list',     label:'My Posts'  },
  { id:'notifs',   icon:'bell',     label:'Alerts'    },
  { id:'settings', icon:'settings', label:'Settings'  },
];
const BROKER_TABS = [
  { id:'leads',    icon:'grid',     label:'Leads'     },
  { id:'profile',  icon:'user',     label:'Profile'   },
  { id:'settings', icon:'settings', label:'Settings'  },
];

const TWEAK_DEFAULTS = {
  "startScreen": "onboarding",
  "themeKey": "slate",
  "userName": "Rahul"
};

function TabBar({ tabs, active, onTab }) {
  return (
    <div style={{ display:'flex', borderTop:'1px solid var(--bdr)', background:'var(--surf)', backdropFilter:'blur(12px)', padding:'8px 0 6px' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onTab(t.id)} style={{
          flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3,
          background:'none', border:'none', cursor:'pointer', padding:'4px 0',
          fontFamily:'DM Sans,sans-serif', fontSize:10, fontWeight: active===t.id ? 600 : 500,
          color: active===t.id ? 'var(--accent)' : 'var(--t3)', transition:'color 0.18s',
        }}>
          <div style={{ position:'relative' }}>
            <Icon name={t.icon} size={22} color={active===t.id ? 'var(--accent)' : 'var(--t3)'}/>
            {t.id==='notifs' && <div style={{ position:'absolute', top:-1, right:-2, width:7, height:7, borderRadius:100, background:'var(--accent)', border:'1.5px solid var(--surf)' }}/>}
          </div>
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const saved = JSON.parse(localStorage.getItem('fmh2_state') || '{}');
  const [themeKey, setThemeKeyRaw] = useState(saved.themeKey || TWEAK_DEFAULTS.themeKey);
  const [screen,   setScreenRaw]   = useState(saved.screen   || TWEAK_DEFAULTS.startScreen);
  const [history,  setHistory]     = useState([]);
  const [params,   setParams]      = useState({});
  const [userType, setUserType]    = useState(saved.userType  || null);
  const [loggedIn, setLoggedIn]    = useState(saved.loggedIn  || false);
  const [userName, setUserName]    = useState(saved.userName  || TWEAK_DEFAULTS.userName);
  const [buyerTab, setBuyerTab]    = useState('home');
  const [brokerTab,setBrokerTab]   = useState('leads');
  const [tweakOpen,setTweakOpen]   = useState(false);

  // theme
  useEffect(() => { applyTheme(themeKey); }, [themeKey]);

  const setThemeKey = (k) => {
    setThemeKeyRaw(k);
    save({ themeKey: k });
    window.parent.postMessage({ type:'__edit_mode_set_keys', edits:{ themeKey: k } }, '*');
  };

  const save = (patch) => {
    const cur = JSON.parse(localStorage.getItem('fmh2_state') || '{}');
    localStorage.setItem('fmh2_state', JSON.stringify({ ...cur, ...patch }));
  };

  const push = useCallback((s, p = {}) => {
    setHistory(h => [...h, screen]);
    setScreenRaw(s);
    setParams(p);
    save({ screen: s });
  }, [screen]);

  const pop = useCallback(() => {
    const prev = history[history.length - 1] || 'onboarding';
    setHistory(h => h.slice(0, -1));
    setScreenRaw(prev);
    setParams({});
    save({ screen: prev });
  }, [history]);

  const replace = (s, p = {}) => {
    setScreenRaw(s);
    setParams(p);
    setHistory([]);
    save({ screen: s });
  };

  const login = (type, name = userName) => {
    setUserType(type);
    setLoggedIn(true);
    setUserName(name);
    save({ userType: type, loggedIn: true, userName: name });
    replace(type === 'broker' ? 'broker_leads' : 'buyer_home');
  };

  const logout = () => {
    setLoggedIn(false);
    setUserType(null);
    save({ loggedIn: false, userType: null });
    replace('onboarding');
  };

  // Tweaks
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweakOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type:'__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const theme = THEMES[themeKey] || THEMES.slate;

  // ── screen map ───────────────────────────────────────────
  const screens = {
    onboarding:    <OnboardingScreen onDone={() => push('auth_phone', { userType:'buyer' })} onBroker={() => push('auth_phone', { userType:'broker' })}/>,
    auth_phone:    <AuthPhoneScreen  userType={params.userType || 'buyer'} onBack={pop} onContinue={ph => push('auth_otp', { phone: ph, userType: params.userType })}/>,
    auth_otp:      <AuthOTPScreen    phone={params.phone || '9876543210'} onBack={pop} onVerified={() => login(params.userType || 'buyer')}/>,

    buyer_home:    <LandingBuyerScreen userName={userName} onPost={() => push('form')} onViewReqs={() => setBuyerTab('reqs')} onViewNotifs={() => setBuyerTab('notifs')}/>,
    buyer_reqs:    <MyRequirementsScreen onPost={() => push('form')} onBack={pop}/>,
    buyer_notifs:  <NotificationsScreen onBack={pop}/>,
    buyer_settings:<SettingsScreen onBack={pop} currentTheme={themeKey} onThemeChange={setThemeKey} onLogout={logout} userType="buyer"/>,

    form:          <FormScreen onBack={pop} onComplete={() => push('premium')}/>,
    premium:       <PremiumScreen onAccept={() => replace('success', { priority: true })} onSkip={() => replace('success', { priority: false })}/>,
    success:       <SuccessScreen isPriority={params.priority} onDone={() => replace('buyer_home')}/>,

    broker_leads:  <BrokerDashboard onLeadTap={l => push('lead_detail', { lead: l })} onProfile={() => setBrokerTab('profile')}/>,
    broker_profile:<BrokerProfileScreen onBack={pop} onSettings={() => setBrokerTab('settings')}/>,
    broker_settings:<SettingsScreen onBack={pop} currentTheme={themeKey} onThemeChange={setThemeKey} onLogout={logout} userType="broker"/>,
    lead_detail:   <LeadDetailScreen lead={params.lead || MOCK_LEADS[0]} onBack={pop} onAccept={l => replace('contact_reveal', { lead: l })}/>,
    contact_reveal:<ContactRevealScreen lead={params.lead || MOCK_LEADS[0]} onBack={pop}/>,
  };

  // derive actual visible screen based on tab
  let activeScreen = screen;
  if (loggedIn && userType === 'buyer') {
    if (buyerTab === 'reqs')     activeScreen = 'buyer_reqs';
    else if (buyerTab === 'notifs') activeScreen = 'buyer_notifs';
    else if (buyerTab === 'settings') activeScreen = 'buyer_settings';
    else if (['buyer_home','form','premium','success'].includes(screen)) activeScreen = screen;
    else if (!['form','premium','success','lead_detail','contact_reveal'].includes(screen)) activeScreen = 'buyer_home';
  }
  if (loggedIn && userType === 'broker') {
    if (brokerTab === 'profile')  activeScreen = 'broker_profile';
    else if (brokerTab === 'settings') activeScreen = 'broker_settings';
    else activeScreen = screen;
  }

  const showBuyerTabs  = loggedIn && userType==='buyer'  && !['form','premium','success'].includes(screen);
  const showBrokerTabs = loggedIn && userType==='broker' && !['lead_detail','contact_reveal'].includes(screen);

  return (
    <div className="app-shell">
      {/* Main content */}
      <div className="app-content">
        <div className="scr-enter" key={activeScreen}>
          {screens[activeScreen] || screens['onboarding']}
        </div>
      </div>
      {showBuyerTabs && (
        <div style={{ position:'sticky', bottom:0, zIndex:100 }}>
          <TabBar tabs={BUYER_TABS} active={buyerTab} onTab={t => { setBuyerTab(t); if(t==='home') setScreenRaw('buyer_home'); }}/>
        </div>
      )}
      {showBrokerTabs && (
        <div style={{ position:'sticky', bottom:0, zIndex:100 }}>
          <TabBar tabs={BROKER_TABS} active={brokerTab} onTab={t => { setBrokerTab(t); }}/>
        </div>
      )}

      {/* Tweaks panel */}
      {tweakOpen && (
        <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999, background:'var(--surf)', borderRadius:18, padding:'20px', boxShadow:'0 12px 48px rgba(0,0,0,0.22)', width:260, fontFamily:'DM Sans,sans-serif', border:'1px solid var(--bdr)' }}>
          <div style={{ fontSize:15, fontWeight:700, color:'var(--t1)', marginBottom:16 }}>Tweaks</div>

          <div style={{ fontSize:12, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:10 }}>THEME</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:18 }}>
            {Object.entries(THEMES).map(([k,t]) => (
              <div key={k} onClick={() => setThemeKey(k)} style={{ padding:'10px 12px', borderRadius:12, border:'2px solid', borderColor: themeKey===k ? 'var(--accent)' : 'var(--bdr)', background: themeKey===k ? 'var(--accent-l)' : 'var(--bg)', cursor:'pointer', display:'flex', alignItems:'center', gap:8, transition:'all 0.18s' }}>
                <div style={{ width:18, height:18, borderRadius:6, background:t.swatch, flexShrink:0 }}/>
                <span style={{ fontSize:12, fontWeight:600, color: themeKey===k ? 'var(--accent)' : 'var(--t2)' }}>{t.name}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize:12, fontWeight:700, color:'var(--t3)', letterSpacing:'0.06em', marginBottom:10 }}>QUICK JUMP</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {[['Buyer app','buyer_home'],['Broker app','broker_leads'],['Sign up','onboarding']].map(([l,s]) => (
              <button key={s} onClick={() => { setScreenRaw(s); setParams({}); if(s==='buyer_home'){setUserType('buyer');setLoggedIn(true);setBuyerTab('home');} if(s==='broker_leads'){setUserType('broker');setLoggedIn(true);setBrokerTab('leads');} if(s==='onboarding'){setLoggedIn(false);setUserType(null);} save({screen:s}); }} style={{ padding:'10px', borderRadius:10, border:'1.5px solid var(--bdr)', background:'var(--bg)', fontSize:13, fontWeight:500, color:'var(--t1)', cursor:'pointer', fontFamily:'DM Sans,sans-serif', textAlign:'left', transition:'all 0.18s' }}>{l}</button>
            ))}
          </div>

          <div style={{ fontSize:11, color:'var(--t3)', marginTop:14, textAlign:'center' }}>Theme persists on reload</div>
        </div>
      )}
    </div>
  );
}
