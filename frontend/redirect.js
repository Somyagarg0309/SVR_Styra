import { makeRedirectUri } from 'expo-auth-session';

console.log('Expo Go URI: ', makeRedirectUri());                 // For mobile in Expo Go
console.log('Standalone app URI: ', makeRedirectUri({ scheme: 'myapp' })); // For built apps
