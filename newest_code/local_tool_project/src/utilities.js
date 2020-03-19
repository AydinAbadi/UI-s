import { SHA3,MD5 } from "crypto-js";
/**
 *
 * Coping string to the clipboard
 * @param {*} str
 */
export function copyStringToClipboard(str) {
  // Create new element
  var el = document.createElement("textarea");
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand("copy");
  // Remove temporary element
  document.body.removeChild(el);
}

const TEMP_STATE_KEY = "temp_state_key";

export function saveStorage(state, key = TEMP_STATE_KEY) {
  localStorage.setItem(key, JSON.stringify(state));
}

export function fetchStorage(key = TEMP_STATE_KEY) {
  const res = JSON.parse(localStorage.getItem(key));
  return res;
}

export function removeStorage(key = TEMP_STATE_KEY) {
  localStorage.removeItem(key);
}

export function hashWithKeccak(seedString, message) {
  const seed = seedString || fetchStorage("seed");
  const message16 = message.toString(16);

  const concatMessageSeed = seed.concat(message16);
  const randomValue = SHA3(concatMessageSeed, { outputLength: 256 }).toString();
  const concatMessageRandomValue = message16.concat(randomValue);
  const hashValue = SHA3(concatMessageRandomValue, {
    outputLength: 256
  }).toString();
  return {
    randomValue,
    hashValue
  };
}


export async function hashFile(file, callback) {
  await fileHash(file, MD5, function(x) {
    callback(x.toString());
  });
}

async function fileHash(file, hasher, callback) {
  //Instantiate a reader
  var reader = new FileReader();

  //What to do when we gets data?
  reader.onload = function(e) {
    var hash = hasher(e.target.result);
    callback(hash);
  };
  reader.readAsBinaryString(file);
}

export function isAddress(str){
  var re = new RegExp('^0(x|X)[0-9a-fA-F]{40}$');
  return re.test(str);
}