const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			createAgenda: async () => {
				try {
					const response = await fetch(process.env.REACT_APP_BASEURL + "agendas/" + process.env.REACT_APP_USERNAME, { method: 'POST' });
					if (!response.ok) {
						if (response.status === 400) {
							console.log("Agenda already exist");
							getActions().getContacts();
							return;
						} else {
							alert("Something went wrong, try again later");
						}
					}
				} catch (error) {
					console.error("Error creating agenda:", error);
				}
			},
			getContacts: async () => {
				try {
					const response = await fetch(process.env.REACT_APP_BASEURL + "agendas/" + process.env.REACT_APP_USERNAME + "/contacts", { method: 'GET' });
					if (!response.ok) {
						if (response.status === 404) {
							alert("ERROR! Look for details in the console");
							console.error(await response.json());
						} else {
							alert("Something went wrong, try again later");
						}
						return;
					}
					const data = await response.json();
					if (data && data.contacts) {
						setStore({ contacts: data.contacts });
					}
				} catch (error) {
					console.error("Error fetching contacts:", error);
				}
			},
			addContact: async (contact) => {
				await fetch(process.env.REACT_APP_BASEURL + "agendas/" + process.env.REACT_APP_USERNAME + "/contacts", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"name": contact.name,
						"phone": contact.phone,
						"email": contact.email,
						"address": contact.address
					})
				})
					.then(response => {
						if (response.ok) getActions().getContacts();
						return response;
					})
					.catch(error => {
						console.error(error)
					});
			},
			updateContact: async (contact) => {
				await fetch(process.env.REACT_APP_BASEURL + "agendas/" + process.env.REACT_APP_USERNAME + "/contacts/" + contact.id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"name": contact.name,
						"phone": contact.phone,
						"email": contact.email,
						"address": contact.address
					})
				})
					.then(response => {
						if (response.ok) getActions().getContacts();
						return response;
					})
					.catch(error => {
						console.error(error)
					});
			},
			deleteContact: async (id) => {
				try {
					const response = await fetch(process.env.REACT_APP_BASEURL + "agendas/" + process.env.REACT_APP_USERNAME + "/contacts/" + id, { method: 'DELETE' });

					if (response.ok) {
						await getActions().getContacts();
						return true;
					} else {
						const errorData = await response.json();
						console.error("Error deleting contact:", errorData);
						return false;
					}
				} catch (error) {
					console.error("Error in deleteTask:", error);
					return false;
				}
			}
		}
	};
};

export default getState;
