const generateCipher = (pass: string) => {
  const base =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:;!?@#$/\\'\"()[]{}<>-_+=*%^&";
  let shuffled = base.split("");
  for (let i = 0; i < pass.length; i++) {
    const shift = pass.charCodeAt(i) % shuffled.length;
    shuffled = shuffled.slice(shift).concat(shuffled.slice(0, shift));
    shuffled.reverse();
  }

  return { normal: base, cipher: shuffled.join("") };
};

const encrypt = (text: string, pass: string) => {
  const { normal, cipher } = generateCipher(pass);
  const map = new Map();
  for (let i = 0; i < normal.length; i++) map.set(normal[i], cipher[i]);

  let result = "";
  for (const ch of text) result += map.get(ch) || ch;
  return result;
};

const decrypt = (text: string, pass: string) => {
  const { normal, cipher } = generateCipher(pass);
  const map = new Map();
  for (let i = 0; i < cipher.length; i++) map.set(cipher[i], normal[i]);

  let result = "";
  for (const ch of text) result += map.get(ch) || ch;
  return result;
};

interface ZWSteg {
  readonly charset: string;
  readonly symbols: Record<string, string>;
  readonly revSymbols: Map<string, string>;
  encode: (secret: string) => string;
  decode: (encoded: string) => string;
}

const ZWSteg: ZWSteg = {
  charset:
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:;!?@#$/\\'\"()[]{}<>-_+=*%^&",
  symbols: {
    "00": "\u200C",
    "01": "\u202C",
    "10": "\u200D",
    "11": "\uFEFF",
  },

  revSymbols: new Map([
    ["\u200C", "00"],
    ["\u202C", "01"],
    ["\u200D", "10"],
    ["\uFEFF", "11"],
  ]),

  encode: function (this: ZWSteg, secret: string): string {
    if (typeof secret !== "string") {
      throw new Error("Input must be a string");
    }
    let bitstring: string = "";
    for (let char of secret) {
      let idx: number = this.charset.indexOf(char);
      if (idx === -1) {
        throw new Error(`Invalid character: ${char}`);
      }
      bitstring += idx.toString(2).padStart(7, "0");
    }
    while (bitstring.length % 2 !== 0) {
      //pad
      bitstring += "0";
    }
    let encoded: string = "";
    for (let i = 0; i < bitstring.length; i += 2) {
      let pair: string = bitstring.slice(i, i + 2);
      encoded += this.symbols[pair];
    }
    return encoded;
  },

  decode: function (this: ZWSteg, encoded: string): string {
    if (typeof encoded !== "string") {
      throw new Error("Input must be a string");
    }
    let bitstring: string = "";
    for (let char of encoded) {
      let bits: string | undefined = this.revSymbols.get(char);
      if (bits) {
        bitstring += bits;
      }
    }
    let numChars: number = Math.floor(bitstring.length / 7);
    let secret: string = "";
    for (let j = 0; j < numChars; j++) {
      let bits: string = bitstring.slice(7 * j, 7 * j + 7);
      let idx: number = parseInt(bits, 2);
      if (idx < this.charset.length) {
        secret += this.charset[idx];
      } else {
        break;
      }
    }
    return secret;
  },
};

export { decrypt, encrypt, ZWSteg };

// [isPass?\u202c:\u200c][secret text][Real text][pass?if any]
