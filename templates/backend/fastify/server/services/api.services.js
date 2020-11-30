module.exports = function(){
  return `interface iCustomers {
  id: string,
  name: string
}
interface IParams {
  id: string,
}

let customers: Array<iCustomers> = [
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

export async function createCustomerService(customer: iCustomers[]): Promise<string | void> {

  try {
    customers = customer;
    return "Successfully created customer";
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

export async function updateCustomerService(customer: iCustomers): Promise<string | void> {
  try {
    const index = findElementByIndex(customer.id);
    customers[index] = customer;
    return \`\${customer.name} was updated successfully.\`;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCustomerService(customer: IParams): Promise<string | void> {
  try {
    const index = findElementByIndex(customer.id);
    const name = customers[index].name;
    customers.splice(index, 1);
    return \`\${name} was deleted successfully.\`;
  } catch (error) {
    console.error(error);
  }
}`
}

