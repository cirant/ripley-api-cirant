require('dotenv').config();

export const firebaseConfig = {
  type: 'service_account',
  project_id: 'riplay-b89be',
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  client_email: 'firebase-adminsdk-zgplw@riplay-b89be.iam.gserviceaccount.com',
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.googlegoogleapis.com/o/oauth2/auth',
  token_uri: 'https://oauth2..com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};