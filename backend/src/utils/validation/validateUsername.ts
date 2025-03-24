export default function isValidUsername(username: string) {
    const regex = /^[a-zA-Z0-9._-]{4,20}$/;
    return regex.test(username);
}