const FileReader = require('./FileReader');
const Validation = require('./Validation');
const DistanceCalculator = require('./DistanceCalculator');

const MAX_DISTANCE_FROM_OFFICE_IN_KM = 100;
const OFFICE_LATITUDE = '53.339428';
const OFFICE_LONGITUDE = '-6.257664';

const sortCustomersByUserIdAsc = (customers = []) => {
  return customers.sort((a, b) => a['user_id'] - b['user_id']);
};

const generateCustomerList = async (filename) => {
  if (!filename) {
    return 'No filename provided';
  }
  const rawCustomersFileData = await FileReader.getFileData(filename);
  const customers = FileReader.parseFileDataAsArray(rawCustomersFileData);
  if (!customers) {
    return 'Could not parse customers from input file';
  }

  const customersDataIsValid = Validation.validateCustomersData(customers);
  if (!customersDataIsValid) {
    return 'Invalid customers data';
  }

  const customersWithinInviteDistance = [];
  customers.forEach((customer) => {
    const distanceFromOffice = DistanceCalculator.calculateDistanceBetweenPointsInKm(
      OFFICE_LATITUDE,
      OFFICE_LONGITUDE,
      customer.latitude,
      customer.longitude
    );
    if (distanceFromOffice <= MAX_DISTANCE_FROM_OFFICE_IN_KM) {
      return customersWithinInviteDistance.push(customer);
    }
  });

  const sortedCustomersWithinInviteDistance = sortCustomersByUserIdAsc(
    customersWithinInviteDistance
  );
  const formattedCustomers = sortedCustomersWithinInviteDistance.map(
    (customer) => `${customer.name} - User ID: ${customer['user_id']}`
  );
  return formattedCustomers.join('\n');
};

module.exports = { generateCustomerList };
