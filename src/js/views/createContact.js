import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const CreateContact = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [id]: value
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        actions.addContact(contact);
        setContact({
            name: "",
            email: "",
            phone: "",
            address: ""
        });
        navigate("/");
    };

    return (
        <div className="mx-5">
            <form onSubmit={handleCreate}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={contact.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={contact.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label fw-bold">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={contact.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label fw-bold">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={contact.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
            <Link to="/">or get back to contacts</Link>
        </div>
    );
};
