// ==UserScript==
// @name         Mostrar contenido descifrado
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Lab04Cripto
// @author       Fer
// @match        https://cripto.tiiny.site/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js#sha384-S3wQ/l0OsbJoFeJC81UIr3JOlx/OzNJpRt1bV+yhpWQxPAahfpQtpxBSfn+Isslc
// ==/UserScript==

(function() {
    'use strict';
    var char = document.body.textContent;
    var key = char.match(/[A-Z]/g).join('');
    console.log('La llave es: ' + key);

    var messages = document.querySelectorAll('div[class^="M"]');
    console.log('Los mensajes cifrados son: ' + messages.length);
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
    script.integrity = "sha384-S3wQ/l0OsbJoFeJC81UIr3JOlx/OzNJpRt1bV+yhpWQxPAahfpQtpxBSfn+Isslc";
    script.crossOrigin = 'anonymous';

    let keyEncrypted = CryptoJS.enc.Utf8.parse(key);
    for (var i = 0; i < messages.length; i++) {
        var encryptedMessage = messages[i].id;
        // Descifrar el mensaje
        var decryptedMessage = CryptoJS.TripleDES.decrypt(encryptedMessage, keyEncrypted, {
            mode: CryptoJS.mode.ECB
        }).toString(CryptoJS.enc.Utf8);
        // Muesra el mensaje encryptado y desencriptado
        console.log(encryptedMessage + decryptedMessage );
        // Reemplazar el contenido cifrado con el descifrado
        messages[i].textContent = decryptedMessage;
    }
})();