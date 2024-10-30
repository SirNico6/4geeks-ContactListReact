import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";
import { ContactCard } from "../component/contactCard";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				{store.contacts.map((item) => {
					return (
						<ContactCard key={item.id} contact={item} />
					);
				})}
			</ul>
		</div>
	);
};
