class Adapter {



    
    fetchAllUsers(id){
       return fetch(`http://localhost:3000/allusers/${id}`)
        .then(resp => resp.json())
    }

    fetchUsersNoConvo(id){
        return fetch(`http://localhost:3000/users/noconvo/${id}`)
         .then(resp => resp.json())
     }

    fetchOneUser(id){
        return fetch(`http://localhost:3000/users/${id}`)
         .then(resp => resp.json())
     }

    fetchDeleteContact(id, contactId){
        return fetch(`http://localhost:3000/users/${id}/newcontact/${contactId}`, {
             method: 'DELETE', // or 'PUT'
         })
         .then((response) => response.json())   
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

     fetchAllConversations(id){
        return fetch(`http://localhost:3000/conversations/${id}`)
         .then(resp => resp.json())
     }

     fetchNewConversation(data){
        return fetch("http://localhost:3000/conversations/new", {
            method: 'POST', // or 'PUT'
            headers: {
        'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())   
    }

    fetchNewMessage(data){
        return fetch("http://localhost:3000/conversations/newmessage", {
            method: 'POST', // or 'PUT'
            headers: {
        'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())   
    }


}