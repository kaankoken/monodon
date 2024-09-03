export default function snake_case(str: string, useKebabCase = false): string {
  const chars = str.split('');

  let converted = '';
  let prevCharWasSpecial = false;

  for (const char of chars) {
    if (isLetter(char)) {
      if (prevCharWasSpecial) {
        converted += char.toLowerCase();
        prevCharWasSpecial = false;
      } else {
        converted += char.toLowerCase();
      }
    } else if (isNumber(char)) {
      converted += char;
      prevCharWasSpecial = false;
    } else {
      if (!prevCharWasSpecial) {
        converted += useKebabCase ? '-' : '_';
      }
      prevCharWasSpecial = true;
    }
  }

  // Remove leading or trailing separators
  return converted.replace(/^[-_]+|[-_]+$/g, '');
}

function isLetter(char: string) {
  return char.toLowerCase() != char.toUpperCase();
}

function isNumber(char: string) {
  const int = parseInt(char, 10);
  return !isNaN(int);
}
