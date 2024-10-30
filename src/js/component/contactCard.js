import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = (props) => {
    const { name, phone, email, address, id } = props.contact;
    const { store, actions } = useContext(Context);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const confirmDelete = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (selectedContact) {
            const deleted = await actions.deleteContact(selectedContact.id);
            if (deleted) {
                await actions.getContacts();
            } else {
                alert("Something went wrong deleting this contact");
            }
            setSelectedContact(null);
            setIsModalOpen(false);
        }
    };

    return (
        <div className="card mb-3">
            <div className="row g-0 align-items-center ms-3">
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <img
                        src={"https://i.pravatar.cc/200" + "?u=" + name}
                        className="img-fluid rounded-circle"
                        alt="Profile photo"
                        style={{ width: "100px", height: "100px" }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title mb-1">{name}</h5>
                        <p className="card-text mb-0">
                            <i className="fa-solid fa-location-dot me-2"></i>
                            {address || "No address"}
                        </p>
                        <p className="card-text mb-0">
                            <i className="fa-solid fa-phone-flip me-2"></i>
                            {phone || "No phone"}
                        </p>
                        <p className="card-text">
                            <i className="fa-solid fa-envelope me-2"></i>
                            {email || "No email"}
                        </p>
                    </div>
                </div>
                <div className="col-md-2 d-flex justify-content-center align-items-center gap-3"
                    style={{ position: "absolute", top: "3vh", right: "3vh" }}>
                    <Link to={`/editContact/${id}`} className="text-black">
                        <i className="fa-solid fa-pencil me-3"></i>
                    </Link>
                    <i
                        className="fa-solid fa-trash"
                        style={{ cursor: "pointer" }}
                        onClick={() => confirmDelete(props.contact)}
                    ></i>
                </div>
            </div>
            <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={!isModalOpen}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete contact</h1>
                            <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this contact?</p>
                            <p>{selectedContact ? selectedContact.name : "?"}</p>
                            <p className="text-danger fw-bold">This action can't be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
