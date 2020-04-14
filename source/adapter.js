class Adapter {
    
    fetchAllUsers(){
       return fetch("http://localhost:3000/users")
        .then(resp => resp.json())
    }

    fetchCreateContact(id, contactId){
        return fetch(`http://localhost:3000/users/${id}/newcontact`, {
             method: 'POST', // or 'PUT'
             headers: {
             'Content-Type': 'application/json',
             },
             body: JSON.stringify({user_contact_id: contactId}),
         })
         .then((response) => response.json())   
     }


    fetchCreateUser(data){
       return fetch("http://localhost:3000/users", {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())   
    }

    fetchLoginUser(data){
        return fetch("http://localhost:3000/users/login", {
             method: 'POST', // or 'PUT'
             headers: {
             'Content-Type': 'application/json',
             },
             body: JSON.stringify(data),
         })
         .then((response) => response.json())   
     }






}