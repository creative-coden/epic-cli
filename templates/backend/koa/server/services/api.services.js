module.exports = function(){
  return `interface iCustomers {
  id: string,
  name: string
}

const customers: Array<iCustomers> = [
  { id: "1", name: "Judy Hopps" },
  { id: "2", name: "Nick Wilde" },
  { id: "3", name: "Cheif Bogo" },
  { id: "4", name: "Clawhauser" },
];

function findElementByIndex(id: string) {
  if (!id) return -1;
  return customers.findIndex(function findIndex(item) {
    return item.id === id;
  });
}

export async function createCustomerService(customer: iCustomers): Promise<iCustomers[] | void> {

  try {
    customers.splice(customers.length, 0, customer);
    return customers;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCustomerService(): Promise<iCustomers[] | void> {
  try {
    return customers;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCustomerService(id: string, customer: iCustomers): Promise<iCustomers[] | void> {
  try {
    const index = findElementByIndex(id);
    customers[index] = customer;
    return customers;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCustomerService(id: string): Promise<iCustomers[] | void> {
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

