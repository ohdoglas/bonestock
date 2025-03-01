import crypto from 'crypto';

export async function generateConfirmationToken(): Promise<string> {
    const string = await crypto.randomBytes(32).toString('hex');
    return string;
}