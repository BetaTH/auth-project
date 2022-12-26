export function decodeJwt<T>(token: string) {
  var base64Payload = token.split(".")[1];
  var payloadBuffer = Buffer.from(base64Payload, "base64");
  return <T>JSON.parse(payloadBuffer.toString());
}
