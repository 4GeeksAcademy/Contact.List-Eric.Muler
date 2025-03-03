export const initialStore = () => {
  return {
    slug: "",  
    contacts: []  
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'Añadir contacto':
      const { name, address, phone, email, id } = action.payload;
      return {
        ...store,
        contacts: [...store.contacts, { name, address, phone, email, id }]
      };

    case 'GET_CONTACTS':
      const contacts = action.payload;
      return {
        ...store,
        contacts: contacts
      };

    case 'Borrar contacto':
      const deleteId = action.payload;
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== deleteId)
      };

    case 'Editar contacto':
      const editedContact = action.payload;
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === editedContact.id ? editedContact : contact
        )
      };

    case 'Crear usuario':
      const username = action.payload;
      return {
        ...store,
        slug: username
      };

    case 'Eliminar usuario':
      // Aquí se resetea el estado de slug y se eliminan los contactos
      return {
        ...store,
        slug: "",  // Limpia el slug (el usuario)
        contacts: []  // Limpia los contactos asociados
      };

    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
}
