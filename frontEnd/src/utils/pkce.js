// src/utils/pkce.js

/**
 * Genera una cadena aleatoria de la longitud especificada.
 * @param {number} length - La longitud de la cadena a generar.
 * @returns {string} La cadena aleatoria generada.
 */
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'; // Caracteres seguros para base64url
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

/**
 * Calcula el hash SHA256 de una cadena.
 * @param {string} plain - La cadena de texto a hashear.
 * @returns {Promise<ArrayBuffer>} El hash SHA256 como ArrayBuffer.
 */
const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return hashBuffer;
};

/**
 * Codifica un ArrayBuffer a Base64Url.
 * @param {ArrayBuffer} buffer - El ArrayBuffer a codificar.
 * @returns {string} La cadena codificada en Base64Url.
 */
const base64urlencode = (buffer) => {
    // Convertir ArrayBuffer a cadena binaria
    const binary = Array.from(new Uint8Array(buffer)).map(byte => String.fromCharCode(byte)).join('');
    // Codificar a Base64 y luego convertir a Base64Url
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // Eliminar padding
};

/**
 * Genera el code_verifier y el code_challenge para PKCE.
 * @returns {Promise<{code_verifier: string, code_challenge: string}>} Un objeto con el verifier y el challenge.
 */
export const generatePkceCodes = async () => {
    // El code_verifier debe tener entre 43 y 128 caracteres.
    const code_verifier = generateRandomString(128);
    const hashed = await sha256(code_verifier);
    const code_challenge = base64urlencode(hashed);
    return { code_verifier, code_challenge };
};
