module.exports = function(){
  return `export let customers = [
    { id: 1, name: 'Judy Hopps' },
    { id: 2, name: 'Nick Wilde' },
    { id: 3, name: 'Cheif Bogo' },
    { id: 4, name: 'Clawhauser' },
  ];
  
  function findElementByIndex(id) {
    if (!id) return -1;
    return customers.findIndex(function findIndex(item) {
      return item.id === id;
    });
  }
  
  export async function createCustomerService(customer) {
    try {
      customers.splice(customers.legnth, 0, customer);
      return customers;
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function fetchCustomerService(id) {
    try {
      const index = findElementByIndex(id);
      return index === -1 ? customers : customers[index];
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function updateCustomerService(id, customer) {
    try {
      const index = findElementByIndex(id);
      customers[index] = customer;
      return customers;
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function deleteCustomerService(id) {
    try {
      const index = findElementByIndex(id);
      customers.splice(index, 1);
      return customers;
    } catch (error) {
      console.error(error);
    }
  }
  `
}

