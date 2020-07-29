const validateCustomersData = (customers) => {
  if (!customers || !Array.isArray(customers)) {
    return false;
  }

  try {
    customers.forEach((customer) => {
      if (
        !customer.latitude ||
        !customer['user_id'] ||
        !customer.name ||
        !customer.longitude
      ) {
        throw new Error();
      }
    });
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  validateCustomersData,
};
