// const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

// async function testContacts() {
//   // Перевірка функції listContacts
//   const allContacts = await listContacts();
//   console.log('All Contacts:', allContacts);

//   // Перевірка функції getContactById
//   const contactById = await getContactById(1); // Передайте дійсний id контакту
//   console.log('Contact by ID:', contactById);

//   // Перевірка функції removeContact
//   const removedContact = await removeContact(1); // Передайте дійсний id контакту
//   console.log('Removed Contact:', removedContact);

//   // Перевірка функції addContact
//   const newContact = await addContact('John Doe', 'johndoe@example.com', '1234567890');
//   console.log('New Contact:', newContact);

//   // Перевірка функції listContacts після виконання дій
//   const updatedContacts = await listContacts();
//   console.log('Updated Contacts:', updatedContacts);
// }

// testContacts();

import { Command } from 'commander';
import {
  listContacts,
  getContactById,
  removeContact,
  addContact
} from './contacts.js';

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const options = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then((contacts) => console.table(contacts));
      break;

    case 'get':
      getContactById(id).then((contact) => console.log(contact));
      break;

    case 'add':
      addContact(name, email, phone).then((contact) => console.log(contact));
      break;

    case 'remove':
      removeContact(id).then((contact) => console.log(contact));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);