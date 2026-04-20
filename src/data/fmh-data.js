// src/data/fmh-data.js — FindMyHome theme system + mock data

export const THEMES = {
  slate: {
    name: 'Slate', swatch: '#1e3a8a', isDark: false, stage: '#0c0f1a',
    vars: {
      '--accent':   'oklch(38% 0.16 255)',
      '--accent-l': 'oklch(94% 0.04 255)',
      '--accent-m': 'oklch(55% 0.13 255)',
      '--trust':    'oklch(52% 0.14 162)',
      '--trust-l':  'oklch(94% 0.05 162)',
      '--bg':       'oklch(98.5% 0.004 240)',
      '--surf':     '#ffffff',
      '--bdr':      'oklch(91% 0.01 240)',
      '--t1':       'oklch(14% 0.01 255)',
      '--t2':       'oklch(45% 0.01 255)',
      '--t3':       'oklch(65% 0.01 255)',
      '--danger':   'oklch(55% 0.18 25)',
    }
  },
  verdant: {
    name: 'Verdant', swatch: '#14532d', isDark: false, stage: '#060e08',
    vars: {
      '--accent':   'oklch(40% 0.14 155)',
      '--accent-l': 'oklch(94% 0.05 155)',
      '--accent-m': 'oklch(56% 0.12 155)',
      '--trust':    'oklch(52% 0.13 200)',
      '--trust-l':  'oklch(94% 0.05 200)',
      '--bg':       'oklch(98.5% 0.005 145)',
      '--surf':     '#ffffff',
      '--bdr':      'oklch(91% 0.02 145)',
      '--t1':       'oklch(14% 0.02 150)',
      '--t2':       'oklch(46% 0.02 150)',
      '--t3':       'oklch(65% 0.01 150)',
      '--danger':   'oklch(55% 0.18 25)',
    }
  },
  ember: {
    name: 'Ember', swatch: '#7c2d12', isDark: false, stage: '#120600',
    vars: {
      '--accent':   'oklch(48% 0.18 38)',
      '--accent-l': 'oklch(95% 0.05 45)',
      '--accent-m': 'oklch(62% 0.15 38)',
      '--trust':    'oklch(52% 0.14 162)',
      '--trust-l':  'oklch(94% 0.05 162)',
      '--bg':       'oklch(98.5% 0.006 55)',
      '--surf':     '#ffffff',
      '--bdr':      'oklch(91% 0.02 50)',
      '--t1':       'oklch(15% 0.03 35)',
      '--t2':       'oklch(46% 0.04 38)',
      '--t3':       'oklch(64% 0.02 40)',
      '--danger':   'oklch(55% 0.18 25)',
    }
  },
  obsidian: {
    name: 'Obsidian', swatch: '#0d0d1a', isDark: true, stage: '#000000',
    vars: {
      '--accent':   'oklch(72% 0.14 255)',
      '--accent-l': 'oklch(22% 0.06 255)',
      '--accent-m': 'oklch(58% 0.12 255)',
      '--trust':    'oklch(68% 0.14 162)',
      '--trust-l':  'oklch(22% 0.06 162)',
      '--bg':       'oklch(12% 0.01 255)',
      '--surf':     'oklch(17% 0.015 255)',
      '--bdr':      'oklch(24% 0.015 255)',
      '--t1':       'oklch(94% 0.005 255)',
      '--t2':       'oklch(64% 0.01 255)',
      '--t3':       'oklch(44% 0.01 255)',
      '--danger':   'oklch(70% 0.18 25)',
    }
  },
};

export function applyTheme(key) {
  const t = THEMES[key];
  if (!t) return;
  const r = document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => r.style.setProperty(k, v));
  document.body.style.background = t.stage;
}

export const MOCK_LEADS = [
  { id:1, initials:'RS', name:'Rahul Sharma', phone:'+91 98765 43210', whatsapp:'919876543210',
    type:'2 BHK Apartment', city:'Bengaluru', area:'Koramangala', budget:'₹55L',
    timeline:'7 days', priority:true, time:'2 min ago',
    furnishing:'Semi-furnished', parking:true, facing:'East', verified:true,
    note:'Looking for ground/first floor. Pet-friendly building preferred.' },
  { id:2, initials:'AM', name:'Anita Mehta', phone:'+91 87654 32109', whatsapp:'918765432109',
    type:'3 BHK Flat', city:'Mumbai', area:'Powai', budget:'₹1.2Cr',
    timeline:'15 days', priority:true, time:'18 min ago',
    furnishing:'Fully furnished', parking:true, facing:'North', verified:true,
    note:'Needs school within 1km. Max 3rd floor preferred.' },
  { id:3, initials:'SK', name:'Suresh Kumar', phone:'+91 76543 21098', whatsapp:'917654321098',
    type:'Independent House', city:'Hyderabad', area:'Jubilee Hills', budget:'₹90L',
    timeline:'1 month', priority:false, time:'45 min ago',
    furnishing:'Unfurnished', parking:false, facing:'Any', verified:false,
    note:'' },
  { id:4, initials:'PR', name:'Priya Rao', phone:'+91 65432 10987', whatsapp:'916543210987',
    type:'Villa', city:'Bengaluru', area:'Whitefield', budget:'₹2.1Cr',
    timeline:'Flexible', priority:false, time:'1 hr ago',
    furnishing:'Fully furnished', parking:true, facing:'West', verified:true,
    note:'Corner plot preferred. Open to ready-to-move options.' },
];

export const MOCK_REQUIREMENTS = [
  { id:1, type:'2 BHK Apartment', area:'Koramangala, Bengaluru', budget:'₹55L',
    timeline:'7 days', status:'active', brokerViews:4, calls:1, postedAt:'2 hours ago', priority:true },
  { id:2, type:'1 BHK Flat', area:'Indiranagar, Bengaluru', budget:'₹30L',
    timeline:'1 month', status:'closed', brokerViews:12, calls:3, postedAt:'3 days ago', priority:false },
];

export const MOCK_NOTIFS = [
  { id:1, icon:'badge', title:'New broker match', body:'Verified broker Ramesh K. is reviewing your 2BHK requirement', time:'5 min ago', read:false },
  { id:2, icon:'phone', title:'Broker wants to call', body:'Sunita Properties matched your Koramangala requirement', time:'1 hr ago', read:false },
  { id:3, icon:'sparkle', title:'Priority boost active', body:'Your lead is now visible to top 3 brokers in your area', time:'2 hr ago', read:true },
  { id:4, icon:'check_circle', title:'Requirement closed', body:'Rate your experience with 1BHK in Indiranagar', time:'3 days ago', read:true },
];

export const MOCK_REVIEWS = [
  { name:'Vikram S.', rating:5, text:'Ramesh was professional and showed us exactly what we wanted. Closed in 10 days.', date:'Mar 2025' },
  { name:'Deepa M.', rating:5, text:'Very responsive. No spam, no fake listings. Highly recommend.', date:'Feb 2025' },
  { name:'Arjun K.', rating:4, text:'Good knowledge of Koramangala area. Could improve on response time.', date:'Jan 2025' },
];
