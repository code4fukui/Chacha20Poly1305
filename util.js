export function fromHex(h) {
  h = h.replace(/([^0-9a-f])/g, '');
  var out = [], len = h.length, w = '';
  for (var i = 0; i < len; i += 2) {
    w = h[i];
    if (((i+1) >= len) || typeof h[i+1] === 'undefined') {
        w += '0';
    } else {
        w += h[i+1];
    }
    out.push(parseInt(w, 16));
  }
  return out;
}

export function bytesEqual(a, b) {
  var dif = 0;
  if (a.length !== b.length) return 0;
  for (var i = 0; i < a.length; i++) {
    dif |= (a[i] ^ b[i]);
  }
  dif = (dif - 1) >>> 31;
  return (dif & 1);
}

export function printHex(num, len, padlen, block) {
  var ret = '', pad = '', i;
  for (i=0; i<padlen;i++) pad += '0';
  i = 0;
  while (i < len) {
    var h = num[i].toString(16);
    ret += (pad + h).slice(-padlen);
    ret += ((i%block) === block-1) ? '\n' : ' ';
    i++;
  }
  console.log(ret);
}

export function decodeUTF8(s) {
  var i, d = unescape(encodeURIComponent(s)), b = new Uint8Array(d.length);
  for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
  return b;
}
