// src/utils/getSubdomain.js
export function getSubdomain() {
    const host = window.location.hostname; // e.g. app.swasive.io
    const parts = host.split('.');
  
    if (parts.length >= 3) {
      return parts[0]; // e.g. 'app'
    }
  
    return ''; // default to root domain
  }
  