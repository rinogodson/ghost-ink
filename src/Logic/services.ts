const makeSecretText = (
  publicText: string,
  secretText: string,
  pass: string | null,
) => {
  let isPass: boolean = false,
    encryptedText: string = "",
    zeroWidthSecretTextForAttaching: string = "",
    zeroWidthPassword: string = "",
    part1 = publicText.slice(0, 1),
    part2 = publicText.slice(1, publicText.length - 1),
    part3 = publicText.slice(publicText.length - 1, publicText.length);
  console.log(part1, part2, part3);

  if (pass) {
    isPass = true;
  }

  if (isPass) {
    encryptedText = encrypt(secretText, String(pass));
  } else {
    encryptedText = secretText;
  }

  zeroWidthSecretTextForAttaching = ZWSteg.encode(encryptedText);
  if (isPass) {
    zeroWidthPassword = ZWSteg.encode(String(pass));
  }

  if (isPass) {
    return (
      part1 +
      "\u202c" +
      zeroWidthSecretTextForAttaching +
      part2 +
      zeroWidthPassword +
      part3
    );
  } else {
    return part1 + "\u200c" + zeroWidthSecretTextForAttaching + part2 + part3;
  }
};

const doesItHaveAPasswordBro = (text: string) => {
  if (text[1] != "\u202c" && text[1] != "\u200c") return null;
  const hasPass = text[1] === "\u202c";
  return hasPass;
};

const extractSecretText = (text: string, pass: string) => {
  if (text[1] != "\u202c" && text[1] != "\u200c") return null;
  const hasPass = text[1] === "\u202c";
  let firstNonZWIndex = 1;
  for (let i = 1; i < text.length; i++) {
    if (!"\u200c\u200D\u202C\uFEFF".includes(text[i])) {
      firstNonZWIndex = i;
      break;
    }
  }
  const zeroWidthText = text.slice(2, firstNonZWIndex);

  let lastNonZWIndex = 0;
  if (hasPass) {
    for (let i = text.length - 2; i > 0; i--) {
      if (!"\u200c\u200D\u202C\uFEFF".includes(text[i])) {
        lastNonZWIndex = i;
        break;
      }
    }
  }
  const zeroWidthPassword = text.slice(lastNonZWIndex + 1, text.length - 1);

  if (hasPass) {
    const [unpackedText, unPackedPassword] = [
      ZWSteg.decode(zeroWidthText),
      ZWSteg.decode(zeroWidthPassword),
    ];
    if (pass == unPackedPassword) {
      return decrypt(unpackedText, pass);
    } else {
      return null;
    }
  } else {
    const unpackedText = ZWSteg.decode(zeroWidthText);
    return unpackedText;
  }
};

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

export {
  decrypt,
  encrypt,
  ZWSteg,
  makeSecretText,
  extractSecretText,
  doesItHaveAPasswordBro,
};
// [isPass?\u202c:\u200c][secret text][Real text][pass?if any]
