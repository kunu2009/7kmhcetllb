import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

registerSW({
  immediate: true,
  onOfflineReady() {
    console.info('LawRanker is ready for offline use.');
  },
  onRegisterError(error) {
    console.error('Service worker registration failed:', error);
  },
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);