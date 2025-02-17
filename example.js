import { AEAD } from "./AEAD.js"
import { fromHex, printHex, bytesEqual } from "./util.js";

var testVectors = [
  {
    key:        '80 81 82 83 84 85 86 87 88 89 8a 8b 8c 8d 8e 8f'+
                '90 91 92 93 94 95 96 97 98 99 9a 9b 9c 9d 9e 9f',
    nonce:      '07 00 00 00 40 41 42 43 44 45 46 47',
    plaintext:  '4c 61 64 69 65 73 20 61 6e 64 20 47 65 6e 74 6c'+
                '65 6d 65 6e 20 6f 66 20 74 68 65 20 63 6c 61 73'+
                '73 20 6f 66 20 27 39 39 3a 20 49 66 20 49 20 63'+
                '6f 75 6c 64 20 6f 66 66 65 72 20 79 6f 75 20 6f'+
                '6e 6c 79 20 6f 6e 65 20 74 69 70 20 66 6f 72 20'+
                '74 68 65 20 66 75 74 75 72 65 2c 20 73 75 6e 73'+
                '63 72 65 65 6e 20 77 6f 75 6c 64 20 62 65 20 69'+
                '74 2e',
    aad:        '50 51 52 53 c0 c1 c2 c3 c4 c5 c6 c7',
    ciphertext: 'd3 1a 8d 34 64 8e 60 db 7b 86 af bc 53 ef 7e c2'+
                'a4 ad ed 51 29 6e 08 fe a9 e2 b5 a7 36 ee 62 d6'+
                '3d be a4 5e 8c a9 67 12 82 fa fb 69 da 92 72 8b'+
                '1a 71 de 0a 9e 06 0b 29 05 d6 a5 b6 7e cd 3b 36'+
                '92 dd bd 7f 2d 77 8b 8c 98 03 ae e3 28 09 1b 58'+
                'fa b3 24 e4 fa d6 75 94 55 85 80 8b 48 31 d7 bc'+
                '3f f4 de f0 8e 4b 7a 9d e5 76 d2 65 86 ce c6 4b'+
                '61 16',
    tag:        '1a:e1:0b:59:4f:09:e2:6a:7e:90:2e:cb:d0:60:06:91'
  }
];
let i = 0;

const key = fromHex(testVectors[i].key); // 32byte
const nonce = fromHex(testVectors[i].nonce); // 12byte
const plaintext = fromHex(testVectors[i].plaintext);
const aad = fromHex(testVectors[i].aad); // 12byte
const ciphertext = fromHex(testVectors[i].ciphertext);
const tag = fromHex(testVectors[i].tag);

const ret = AEAD.encrypt(key, nonce, plaintext, aad);

if ((bytesEqual(ret[0], ciphertext) !== 1) || (bytesEqual(ret[1], tag) !== 1)) {
  console.log(i, 'encryption error');
  console.log('want:');
  printHex(ciphertext, ciphertext.length, 2, 16);
  console.log('got:');
  printHex(ret[0], ret[0].length, 2, 16);
} else {
  console.log(i, 'encryption OK');
}

const ret2 = AEAD.decrypt(key, nonce, ret[0], aad, ret[1]);

if (ret2 === false) {
  console.log(i, 'decryption error');
}

if (bytesEqual(ret2, plaintext) !== 1) {
  console.log(i, 'decryption error');
  console.log('want:');
  printHex(plaintext, plaintext.length, 2, 16);
  console.log('got:');
  printHex(ret2, ret2.length, 2, 16);
} else {
  console.log(i, 'decryption OK');
}
