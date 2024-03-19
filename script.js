async function encryptText() {
    const textToEncrypt = document.getElementById('inputText').value;
    const password = document.getElementById('password').value;

    const encodedText = new TextEncoder().encode(textToEncrypt);
    const encodedPassword = new TextEncoder().encode(password);

    const encryptedData = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: window.crypto.getRandomValues(new Uint8Array(12)) },
        encodedPassword,
        encodedText
    );

    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    document.getElementById('encryptedText').textContent = encryptedBase64;
}

// Function to decrypt text
async function decryptText() {
    const encryptedText = document.getElementById('encryptedText').textContent;
    const password = document.getElementById('password').value;

    const decodedEncryptedData = new Uint8Array(atob(encryptedText).split('').map(char => char.charCodeAt(0)));

    const decryptedData = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: decodedEncryptedData.slice(0, 12) },
        new Uint8Array(decodedEncryptedData.slice(12)),
        new TextEncoder().encode(password)
    );

    const decryptedText = new TextDecoder().decode(decryptedData);
    document.getElementById('decryptedText').textContent = decryptedText;
}