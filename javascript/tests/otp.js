import crypto from 'crypto'

const timestampTest = false

/* =======================
   BASE32
======================= */

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(str) {
  let bits = '';
  let value = 0;
  let output = [];

  str = str.replace(/=+$/, '').toUpperCase();

  for (const c of str) {
    const idx = BASE32_ALPHABET.indexOf(c);
    if (idx === -1) continue;

    value = (value << 5) | idx;
    bits += '11111';

    if (bits.length >= 8) {
      bits = bits.slice(8);
      output.push((value >> bits.length) & 0xff);
    }
  }
  return Buffer.from(output);
}

/* =======================
   HMAC (RFC 2104)
======================= */

function hmac(algorithm, key, message) {
  return crypto
    .createHmac(algorithm.toLowerCase(), key)
    .update(message)
    .digest();
}

/* =======================
   HOTP (RFC 4226)
======================= */

function generateHOTP({
  secret,
  counter,
  digits = 6,
  algorithm = 'sha1'
}) {
  const buf = Buffer.alloc(8);
  let tmp = counter;

  for (let i = 7; i >= 0; i--) {
    buf[i] = tmp & 0xff;
    tmp >>= 8;
  }

  const hash = hmac(algorithm, secret, buf);
  const offset = hash[hash.length - 1] & 0x0f;

  const code =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);

  return (code % 10 ** digits).toString().padStart(digits, '0');
}

function validateHOTP({
  token,
  secret,
  counter,
  digits = 6,
  algorithm = 'sha1',
  window = 1
}) {
  for (let i = -window; i <= window; i++) {
    if (
      generateHOTP({
        secret,
        counter: counter + i,
        digits,
        algorithm
      }) === token
    ) {
      return i;
    }
  }
  return null;
}

/* =======================
   TOTP (RFC 6238)
======================= */

function counterFromTime({
  period = 30,
  timestamp = timestampTest || Date.now()
}) {
  return Math.floor(timestamp / 1000 / period);
}

function remainingTime({
  period = 30,
  timestamp = Date.now()
}) {
  return period * 1000 - (timestamp % (period * 1000));
}

function generateTOTP({
  secret,
  digits = 6,
  period = 30,
  algorithm = 'sha1',
  timestamp = timestampTest || Date.now()
}) {
  return generateHOTP({
    secret,
    counter: counterFromTime({ period, timestamp }),
    digits,
    algorithm
  });
}

function validateTOTP({
  token,
  secret,
  digits = 6,
  period = 30,
  algorithm = 'sha1',
  timestamp = timestampTest || Date.now(),
  window = 1
}) {
  return validateHOTP({
    token,
    secret,
    counter: counterFromTime({ period, timestamp }),
    digits,
    algorithm,
    window
  });
}

/* =======================
   OTPAUTH URL
======================= */

function otpauthURL({
  type = 'totp',
  label = 'OTPAuth',
  issuer = '',
  secretBase32,
  algorithm = 'SHA1',
  digits = 6,
  period = 30,
  counter = 0,
  issuerInLabel = true
}) {
  const enc = encodeURIComponent;

  let name = enc(label);
  if (issuer && issuerInLabel) {
    name = `${enc(issuer)}:${name}`;
  }

  let url = `otpauth://${type}/${name}?secret=${secretBase32}`;

  if (issuer) url += `&issuer=${enc(issuer)}`;
  url += `&algorithm=${enc(algorithm)}`;
  url += `&digits=${digits}`;

  if (type === 'hotp') url += `&counter=${counter}`;
  if (type === 'totp') url += `&period=${period}`;

  return url;
}

/* =======================
  TEST
======================= */

// secret.bytes trong code bạn
const secret = Buffer.from([
  51, 55, 54, 49, 51, 54, 51, 56, 55, 53,
  51, 56, 52, 53, 57, 56, 57, 51, 56, 56,
  51, 51, 49, 50, 51, 49, 48, 57, 49, 49,
  57, 57, 50, 56, 52, 55, 49, 49, 50, 52,
  52, 56, 56, 57, 52, 52, 49, 48, 50, 49,
  48, 53, 49, 49, 50, 57, 55, 49, 48, 56
]);

const otp = generateTOTP({
  secret,
  algorithm: 'sha1',
  digits: 6,
  period: 30,
});
const otpServer = generateTOTP({
  secret,
  algorithm: 'sha1',
  digits: 6,
  period: 30,
  timestamp: 1766168648 * 1000
});

console.log('TOTP:', otp);
console.log('TOTP:', otpServer);



const callAPI = () => {
  return new Promise((resolve, reject) => {
    fetch(`https://open.spotify.com/api/token?reason=transport&productType=web-player&totp=${otp}&totpServer=${otpServer}&totpVer=61`, {
      "credentials": "include",
      "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0",
        "Accept": "application/json",
        "Accept-Language": "vi",
        "app-platform": "WebPlayer",
        "spotify-app-version": "1.2.80.214.g389e7a20",
        "sentry-trace": "5ef0c94b06c74e4fb5885ce1b7e9db3b-a868c998fe94257c-0",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Priority": "u=4",
        "authorization": "Bearer BQAG9fLePsO7TQmp_HEOSV7BQXexNy9140h_O0z7GfrqqoCS0ZO_qX_F08i4j7nNond2hz4eX5Fz6wDw2PyOUzCcV1U6XB_d5SweaNeeqcFeYTzsgzgLHO14WG5GX8erdyGcFwserQk6p2lwKopSmkLi-vvImVuddk4wEQ2raX0YQlCLUdKbBDVkcGqMBeG6cihi0w88U-r_mab6jhpoFh_452_v70VjwqKHBSDeG9fM1qoLV-tlMmUNS67x6R7cbGWUqWENwnTyg5r1RTYdWOBydDxv6er_VPoreVYg8VcVke8mRevdB-OzucwJ3u-uqjES2-1RIi3loDdWfaHduFcjDycTxTsoLjqWrj_I15OQo1L-9ourcarduK1nkSV6ThYTvc-Izi2XlnGKxa-Y",
        "client-token": "AADiJKp+od7YoYUiqZ5cBltSP9o8mtymEhbtwHi1AyPn0T8h970isDeTcjGZ6kCJhTjfJ3xV4xbLHwWujOjAJy1H95YCczw+cqjUBsvi4doXLpK9RYDVNCNYpp486fdDV07vEgyyB8ib4xRgnXNg3vC68DzwV+JQQmUUDt3bnIGAEl4mMmZXp/GfOyWe8nhHSEi64nU2YQFMEFYIR6G5n6pFSrzF6+UAxlajVKDoXQxobwnjY2laBc+jucPf7ydZoxphFP7jqmxjQsSv4RHcpTp29GuByMvk60RxHHsjbiNOVR3UukA6+XXMzcNLz8knBhs1Uzcr5TbvGZ1wauN7+6sisE0a4NmOzDTj6cUOjtSRtaRidzPdZqyR/ga54HQDQWs="
      },
      "referrer": "https://open.spotify.com/artist/3l0CmX0FuQjFxr8SK7Vqag",
      "method": "GET",
      "mode": "cors"
    })
      .then(async res => {
        const data = await res.json()
        resolve(data)
      })
      .catch(err => reject(err))
  })
}

(() => {
  Promise.allSettled([
    callAPI(),
    callAPI(),
    callAPI(),
    callAPI(),
    callAPI(),
    callAPI(),
    callAPI(),
    callAPI(),
  ]).then(res => {
    const token = res.reduce((acc, cur) => {
      return [...acc, cur.value.accessToken]
    }, [])
    console.log(token)
  })
})()
