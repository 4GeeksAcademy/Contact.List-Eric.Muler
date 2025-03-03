import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";

const NewContact = () => {
    let navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [contactData, setContactData] = useState({ name: "", email: "", phone: "", address: "" });

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            if (!response.ok) throw new Error("Error al agregar el contacto");

            const data = await response.json();

            dispatch({
                type: "Añadir contacto",
                payload: { ...data }
            });

            navigate(`/contacts`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="p-5">
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Introducir nombre"
                    onChange={e => setContactData({ ...contactData, name: e.target.value })}
                    value={contactData.name}
                    required
                />
                <label>Nombre completo</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={e => setContactData({ ...contactData, email: e.target.value })}
                    value={contactData.email}
                    required
                />
                <label>Dirección de email</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Teléfono"
                    onChange={e => setContactData({ ...contactData, phone: e.target.value })}
                    value={contactData.phone}
                    required
                />
                <label>Número de teléfono</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Dirección"
                    onChange={e => setContactData({ ...contactData, address: e.target.value })}
                    value={contactData.address}
                    required
                />
                <label>Dirección</label>
            </div>

            <div className="d-flex justify-content-end">
                <button onClick={handleSave} type="button" className="btn btn-outline-dark m-3 w-100">
                    Guardar
                </button>
            </div>

            <br />
            <Link to="/" className="m-3">Volver</Link>
        </form>
    );
};

export default NewContact;
