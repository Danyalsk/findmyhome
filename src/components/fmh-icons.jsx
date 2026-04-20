import { Fragment } from 'react';

// src/components/fmh-icons.jsx — FindMyHome icon system

export function Icon({ name, size = 20, color = 'currentColor', style: s }) {
  const c = color;
  const icons = {
    shield:       <><path d="M12 2L4 5v6c0 5.25 3.5 10.15 8 11.35C16.5 21.15 20 16.25 20 11V5l-8-3z" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></>,
    lock:         <><rect x="5" y="10" width="14" height="10" rx="2.5" fill="none" stroke={c} strokeWidth="1.8"/><path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="15" r="1.5" fill={c}/></>,
    lock_open:    <><rect x="5" y="10" width="14" height="10" rx="2.5" fill="none" stroke={c} strokeWidth="1.8"/><path d="M16 10V7a4 4 0 00-8 0" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="15" r="1.5" fill={c}/></>,
    check:        <path d="M5 12l4 4 8-8" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    check_circle: <><circle cx="12" cy="12" r="9" fill="none" stroke={c} strokeWidth="1.8"/><path d="M8 12l3 3 5-5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></>,
    star:         <path d="M12 2l2.9 8.7H23l-7.2 5.2 2.8 8.7L12 19.4l-6.6 5.2 2.8-8.7L1 8.7h8.1L12 2z" fill={c}/>,
    home:         <><path d="M3 11L12 2l9 9" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M5 9v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></>,
    user:         <><circle cx="12" cy="8" r="4" fill="none" stroke={c} strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></>,
    bell:         <><path d="M6 10a6 6 0 0112 0c0 3.5 1.5 5 2 6H4c.5-1 2-2.5 2-6z" fill="none" stroke={c} strokeWidth="1.8"/><path d="M10 18a2 2 0 004 0" fill="none" stroke={c} strokeWidth="1.8"/></>,
    sparkle:      <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none"/></>,
    phone:        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    clock:        <><circle cx="12" cy="12" r="9" fill="none" stroke={c} strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none"/></>,
    chevron_r:    <path d="M9 18l6-6-6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    chevron_l:    <path d="M15 18l-6-6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    badge:        <><path d="M12 2L9 5H5l1 4-3 3 3 3-1 4h4l3 3 3-3h4l-1-4 3-3-3-3 1-4h-4l-3-3z" fill="none" stroke={c} strokeWidth="1.8"/><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></>,
    whatsapp:     <><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l4.94-1.38C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke={c} strokeWidth="1.8"/><path d="M8.5 9.5c.5 1 1.5 3 3 4.5s3.5 2.5 4.5 3c.5.2.8-.2.8-.2l.7-1.5c.1-.3 0-.6-.2-.8-.4-.3-1-.7-1.2-.8-.3-.1-.5 0-.7.2l-.5.6c-.2.2-.5.2-.7.1-1-.5-2.5-2-3-3-.1-.2-.1-.5.1-.7l.6-.5c.2-.2.3-.5.2-.7-.1-.2-.5-.8-.8-1.2-.2-.2-.5-.3-.8-.2L9 8.7c-.1 0-.5.3-.5.8z" fill={c}/></>,
    copy:         <><rect x="9" y="9" width="13" height="13" rx="2" fill="none" stroke={c} strokeWidth="1.8"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" fill="none" stroke={c} strokeWidth="1.8"/></>,
    settings:     <><circle cx="12" cy="12" r="3" fill="none" stroke={c} strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke={c} strokeWidth="1.8"/></>,
    palette:      <><circle cx="12" cy="12" r="10" fill="none" stroke={c} strokeWidth="1.8"/><circle cx="8.5" cy="10" r="1.5" fill={c}/><circle cx="12" cy="7.5" r="1.5" fill={c}/><circle cx="15.5" cy="10" r="1.5" fill={c}/><circle cx="15.5" cy="14" r="1.5" fill={c}/><circle cx="8.5" cy="14" r="1.5" fill={c}/></>,
    logout:       <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><path d="M16 17l5-5-5-5M21 12H9" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    edit:         <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    deals:        <><path d="M20 12V22H4V12" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><path d="M22 7H2v5h20V7z" fill="none" stroke={c} strokeWidth="1.8"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" fill="none" stroke={c} strokeWidth="1.8"/></>,
    eye:          <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke={c} strokeWidth="1.8"/><circle cx="12" cy="12" r="3" fill="none" stroke={c} strokeWidth="1.8"/></>,
    credit:       <><rect x="1" y="4" width="22" height="16" rx="3" fill="none" stroke={c} strokeWidth="1.8"/><path d="M1 10h22" stroke={c} strokeWidth="1.8"/></>,
    close:        <path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2" strokeLinecap="round"/>,
    map_pin:      <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke={c} strokeWidth="1.8"/><circle cx="12" cy="10" r="3" fill="none" stroke={c} strokeWidth="1.8"/></>,
    list:         <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
    trending:     <path d="M23 6l-9.5 9.5-5-5L1 18" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    info:         <><circle cx="12" cy="12" r="10" fill="none" stroke={c} strokeWidth="1.8"/><path d="M12 16v-4M12 8h.01" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
    arrow_r:      <path d="M5 12h14M13 6l6 6-6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    plus:         <path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2" strokeLinecap="round"/>,
    note:         <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="none" stroke={c} strokeWidth="1.8"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></>,
    grid:         <><rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke={c} strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke={c} strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke={c} strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke={c} strokeWidth="1.8"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0, ...(s || {}) }}>
      {icons[name] || <circle cx="12" cy="12" r="4" fill={c} />}
    </svg>
  );
}
