const FileReader = require('./FileReader');
const DistanceCalculator = require('./DistanceCalculator');

const MAX_DISTANCE_FROM_OFFICE_IN_KM = 100;
const OFFICE_LATITUDE = '53.339428';
const OFFICE_LONGITUDE = '-6.257664';

const sortCustomersByUserIdAsc = (customers = []) => {
  return customers.sort((a, b) => a['user_id'] - b['user_id']);
};

const generateCustomerList = async () => {
  const rawCustomersFileData = await FileReader.getFileData('customers.txt');
  const customersAsJson = FileReader.parseFileDataAsJson(rawCustomersFileData);

  const customersWithinInviteDistance = [];
  customersAsJson.forEach((customerAsJson) => {
    const customer = JSON.parse(customerAsJson);
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
  sortedCustomersWithinInviteDistance.forEach((customer) => {
    const formattedCustomer = `${customer.name} - User ID: ${customer['user_id']}`;
    console.log(formattedCustomer);
  });
};

generateCustomerList();
