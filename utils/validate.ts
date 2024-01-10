export default function stopIDIsValid(id: string) {
  // Must be truthy
  if (!id) {
    return false;
  }

  // Must be 5 digits
  if (id.length !== 5) {
    return false;
  }

  const stopIDAsNum = Number.parseInt(id);

  // Must be a valid integer
  if (!stopIDAsNum) {
    return false;
  }

  // Must be in [10000, 99999]
  if (stopIDAsNum < 10000 || stopIDAsNum > 99999) {
    return false;
  }

  return true;
}
