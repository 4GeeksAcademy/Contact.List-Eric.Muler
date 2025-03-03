import { React, useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [newUser, setNewUser] = useState("");
    const { store, dispatch } = useGlobalReducer();
    let navigate = useNavigate();
    const [agendas, setAgendas] = useState([]);

    useEffect(() => {
        const getAgendas = async () => {
            try {
                const response = await fetch('https://playground.4geeks.com/contact/agendas?offset=0&limit=100', {
                    headers: { 'accept': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error("Hubo un error al obtener las agendas");
                }

                const data = await response.json();
                setAgendas(data.agendas);

            } catch (error) {
                alert(error.message);
            }
        }
        getAgendas();
    }, []);

    const createUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${newUser}`, {
                method: "POST",
                headers: { 'accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error("Ha habido un error al crear el usuario");
            }

            const data = await response.json();
            dispatch({
                type: "Crear usuario",
                payload: data.slug
            });

        } catch (error) {
            alert(error.message);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}`, {
                method: "DELETE",
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el usuario desde el backend");
            }

            dispatch({
                type: 'Eliminar usuario'
            });

            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="p-3">
            <h1 className="m-4">Bienvenido a tu Lista de contactos</h1>
            <form className="p-5">
                <select
                    onChange={(e) => {
                        if (e.target.value === "") {
                            return;
                        }
                        dispatch({
                            type: "Crear usuario",
                            payload: e.target.value,
                        });
                    }}
                    className="form-select"
                    aria-label="Default select example"
                    value={store.slug || ""}
                >
                    <option value="">Selecciona tu usuario</option>
                    {agendas.length === 0 ? null : agendas.map((agenda) => {
                        return (
                            <option key={agenda.slug} value={agenda.slug}>
                                {agenda.slug}
                            </option>
                        );
                    })}
                </select>

                <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate("/contacts")}>
                    Volver
                </button>
            </form>

            <form action="" className="p-5">
                <div className="mb-3">
                    <label htmlFor="newUsername" className="form-label"><strong>Introduce tu usuario</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        id="newUsername"
                        placeholder="Usuario"
                        onChange={(e) => setNewUser(e.target.value)}
                        value={newUser}
                    />
                    <button
                        className="btn btn-success mt-2"
                        onClick={(e) => {
                            createUser(e);
                            navigate("/contacts");
                        }}>
                        Crear
                    </button>
                </div>
            </form>

            <div className="d-flex justify-content-end">
                <button onClick={deleteUser} className="btn btn-danger mt-3">
                    Eliminar mi cuenta
                </button>
            </div>
        </div>
    );
};

export default Home;
