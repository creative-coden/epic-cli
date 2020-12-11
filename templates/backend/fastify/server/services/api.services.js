module.exports = function(){
  return `import { IRequestBody as Customer } from "../controller/types";

const customers: Array<Customer> = [
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

export async function createCustomerService(customer: Customer): Promise<string | void> {
  try {
    customers.push(customer);
    return \`Successfully created \${customer.name}.\`;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCustomerService(): Promise<Customer[] | void> {
  try {
    return customers;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCustomerService(customer: Customer): Promise<string | void> {
  try {
    const index = findElementByIndex(customer.id);
    customers[index] = customer;
    return \`\${customers[index].name} was updated successfully.\`;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCustomerService(id: string): Promise<string | void> {
  try {
    const index = findElementByIndex(id);
    const name = customers[index].name;
    customers.splice(index, 1);
    return \`\${name} was deleted successfully.\`;
  } catch (error) {
    console.error(error);
  }
}`
}

