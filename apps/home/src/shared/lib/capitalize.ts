export function capitalize(str: string) {
  // " "를 기준으로 단어를 나누고 각 단어의 첫 글자를 대문자로 변환
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
