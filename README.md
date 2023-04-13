# ChaCha20Ploy1305

AEAD encrypt / decrypt lib by ChaCha20 and Poly1305

## Usage

```js
import { AEAD } from "https://code4fukui.github.io/ChaCha20Ploy1305/AEAD.js";

const key = new Uint8Array(32);
const nonce = new Uint8Array(12);
const plaintext = new TextEncoder().encode("abc");
const aad = new Uint8Array(12);
const [cipher, tag] = AEAD.encrypt(key, nonce, plaintext, aad);

const plaintext2 = AEAD.decrypt(key, nonce, cipher, aad, tag);
console.log(new TextDecoder().decode(plaintext2));
```

## Reference

- ChaCha20
    - Written in 2014 by Devi Mandiri. Public domain.
    - Implementation derived from chacha-ref.c version 20080118
    - See for details: http://cr.yp.to/chacha/chacha-20080128.pdf
- Poly1305
    - Written in 2014 by Devi Mandiri. Public domain.
    - Implementation derived from poly1305-donna-16.h
    - See for details: https://github.com/floodyberry/poly1305-donna
