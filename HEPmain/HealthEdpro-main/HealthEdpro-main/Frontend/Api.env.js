// Api.env.js
const API_KEY = 'AIzaSyAASJTXBimLA-DRuhwBxiB6hFXUrvSEe_A';

export default {
  GEMINI_API_KEY: API_KEY,
  GEMINI_API_URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`
};