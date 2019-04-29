import React from 'react';

let cancel =
  process.env.APP_ENV === 'production' && typeof window !== 'undefined' && (window as any).__PRELOADED_STATE__;