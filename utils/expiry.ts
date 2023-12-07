export default function expiryEpochInSeconds() {
  return Math.round(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)).valueOf() /
      1000,
  );
}
