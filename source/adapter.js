class Adapter {
    
    fetchAllUsers(){
        fetch("http://localhost:3000/users")
        .then(resp => resp.json())
        .then(data => {console.log(data)})
    }

    fetchCreateUser(data){
        fetch("http://localhost:3000/users", {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

}