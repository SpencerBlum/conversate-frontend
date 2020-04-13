class Adapter {
    
    fetchAllUsers(){
       return fetch("http://localhost:3000/users")
        .then(resp => resp.json())
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

}