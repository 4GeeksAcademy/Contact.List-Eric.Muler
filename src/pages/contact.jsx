
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactList from "../components/contactList.jsx";

export const Contacts = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<>

			<ContactList/>
		
		</>

	);
}; 