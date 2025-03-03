import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditContact = () => {
    const {store, dispatch} =useGlobalReducer()
    let navigate = useNavigate()
    const { contactId } = useParams();
    const singleContact = store.contacts.find(contact => contact.id === parseInt(contactId));
    
    
    const [editContact, setEditContact] = useState({...singleContact})

    const handleEdit = async (e, id) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${id}`,
                {
                    method: "PUT",
                    headers:{
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: editContact.name,
                        phone: editContact.phone,
                        email: editContact.email,
                        address: editContact.address,
                        
                    })
                    
                } 
            )

            if(!response.ok) throw new Error("Hubo un error al editar este contacto.");

            const editedContact = await response.json();

            dispatch({
                type: "Editar contacto",
                payload: editedContact
            })

            
        } catch (error) {
                
            }
      
    }

    
    return (
        <>
        <form className="p-3">
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Introducir nombre"
                    onChange={e => setEditContact({...editContact, name:e.target.value})}
                    value={editContact.name}
                    required
                    />
                <label htmlFor="floatingInput">Nombre completo</label>
            </div>  

            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Email"
                    onChange={e => setEditContact({...editContact, email:e.target.value})}
                    value={editContact.email}
                    required
                    />
                <label htmlFor="floatingInput">Direccion de email</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Telf"
                    onChange={e => setEditContact({...editContact, phone:e.target.value})}
                    value={editContact.phone}
                    required
                    />
                <label htmlFor="floatingInput">Numero de telf</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Direccion"
                    onChange={e => setEditContact({...editContact, address:e.target.value})}
                    value={editContact.address}
                    required
                    />
                <label htmlFor="floatingInput">Direccion</label>
            </div>
            
            <button  
                onClick={(e)=>{
                    handleEdit(e, contactId);
                    navigate(`/contacts`)
                }}               
                type="button" 
                className="btn btn-info m-3">
                    Editar
            </button>
 
        </form>
        <Link to="/" className="m-3" >volver</Link>
        </>
    )
}

export default EditContact