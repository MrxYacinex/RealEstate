import{
    Account,
    Avatars,
    Client,
    OAuthProvider
} from "react-native-appwrite";
import * as Linking from 'expo-linking';

export const config = {
    platform: 'com.jsm.Real Estate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setEndpoint(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL('/');

        const response = await account.createOAuth2Token(
            OAuthProvider.Google, 
            redirectUri
        );

        if(!response) throw new Error("Failed to Login");

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )
        
        if(browserResult.type != 'success') throw new Error("Failed to Login");

        const url = new URL(browserResult.url);
    } catch(error) {
        console.error(error);
        return false;
    }
}