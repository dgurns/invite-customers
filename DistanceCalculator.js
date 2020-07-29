const convertDegreesToRadians = (degreeValue) => (degreeValue * Math.PI) / 180;

const calculateDistanceBetweenPointsInKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return undefined;
  }

  const lat1AsFloat = parseFloat(lat1);
  const lon1AsFloat = parseFloat(lon1);
  const lat2AsFloat = parseFloat(lat2);
  const lon2AsFloat = parseFloat(lon2);

  const latitudeDifferenceInRadians = convertDegreesToRadians(
    lat2AsFloat - lat1AsFloat
  );
  const longitudeDifferenceInRadians = convertDegreesToRadians(
    lon2AsFloat - lon1AsFloat
  );
  const lat1InRadians = convertDegreesToRadians(lat1AsFloat);
  const lat2InRadians = convertDegreesToRadians(lat2AsFloat);

  const a =
    Math.sin(latitudeDifferenceInRadians / 2) *
      Math.sin(latitudeDifferenceInRadians / 2) +
    Math.sin(longitudeDifferenceInRadians / 2) *
      Math.sin(longitudeDifferenceInRadians / 2) *
      Math.cos(lat1InRadians) *
      Math.cos(lat2InRadians);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const EARTH_RADIUS_IN_KM = 6371;
  const distanceBetweenPoints = EARTH_RADIUS_IN_KM * c;

  return distanceBetweenPoints;
};

module.exports = {
  calculateDistanceBetweenPointsInKm,
};
