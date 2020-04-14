//no css

//create delete functionality 
//create back end route to accept an id and only return all contacts that is not him or already on his list
//get all convopreviews to display use organization fucntions
//when clicked on a convo show all the messages with name and message of who sent it li
//add message to convo
//add a new convo






class Controller{

    constructor(){
        this.adapter = new Adapter()
    }

    initialize(){
        
        let signInForm = document.createElement("form")
        let emailLbl = document.createElement("label")
        let userEmail = document.createElement("input")
        let passwordLbl = document.createElement("label")
        let userPassword = document.createElement("input")
        let userSubmit = document.createElement("input")
        let createAccountBtn = document.createElement("button")
        signInForm.id = "signInFrom"

        emailLbl.innerText = "Email:"
        userEmail.type = "text"
        userEmail.name = "email"
        userEmail.placeholder = "email"

        passwordLbl.innerText = "password:"
        userPassword.type = "text"
        userPassword.name = "password"
        userPassword.placeholder = "password"

        userSubmit.type = "submit"
        userSubmit.value = "Submit"

        signInForm.addEventListener("submit", (e) => {
            e.preventDefault()
            this.loginUser(e)

        })

        createAccountBtn.innerText = "Create Account"
        createAccountBtn.id = "create-account"
        createAccountBtn.addEventListener("click",()=>this.renderCreateAccountPage())


        // let foundDiv = document.querySelector("#mainDiv")
        let mainDiv = this.foundDiv()

        mainDiv.appendChild(signInForm)
        signInForm.appendChild(emailLbl)
        signInForm.appendChild(userEmail)
        signInForm.appendChild(passwordLbl)
        signInForm.appendChild(userPassword)
        signInForm.appendChild(userSubmit)

        mainDiv.appendChild(createAccountBtn)     

    }

    loginUser(e){

    let data = { 
            email: e.target.email.value,
            password: e.target.password.value
    }

    this.adapter.fetchLoginUser(data)
    .then(user => {
        if (user.message === 'Loggin Failed'){
            window.alert(user.message)
        } else {
            this.userId = user.id
            this.loadHomepage(user)
        }
        console.log(user)
    })

    }

    clearPage(){
        console.log("clear the page")
        document.querySelector("#mainDiv").innerHTML= ''

    }

    renderCreateAccountPage(){
        this.clearPage()
        console.log("render me")

        let signUpForm = document.createElement("form")
        let emailLbl = document.createElement("label")
        let userEmail = document.createElement("input")
        let passwordLbl = document.createElement("label")
        let userPassword = document.createElement("input")
        let firstNameLbl = document.createElement("label")
        let userFirstName = document.createElement("input")
        let lastNameLbl = document.createElement("label")
        let userLastName = document.createElement("input")
        let usernameLbl = document.createElement("label")
        let userName = document.createElement("input")
        let phoneNumberLbl = document.createElement("label")
        let phoneNumber = document.createElement("input")
        let userSubmit = document.createElement("input")
        signUpForm.id = "signUpFrom"

        emailLbl.innerText = "Email:"
        userEmail.type = "text"
        userEmail.name = "email"
        userEmail.placeholder = "email"

        firstNameLbl.innerText = "First Name:"
        userFirstName.type = "text"
        userFirstName.name = "first_name"
        userFirstName.placeholder = "first_name"

        lastNameLbl.innerText = "Last Name:"
        userLastName.type = "text"
        userLastName.name = "last_name"
        userLastName.placeholder = "last_name"

        usernameLbl.innerText = "Username:"
        userName.type = "text"
        userName.name = "username"
        userName.placeholder = "username"

        phoneNumberLbl.innerText = "Phone Number:"
        phoneNumber.type = "text"
        phoneNumber.name = "phone_number"
        phoneNumber.placeholder = "phonenumber"

        passwordLbl.innerText = "password:"
        userPassword.type = "text"
        userPassword.name = "password"
        userPassword.placeholder = "password"

        userSubmit.type = "submit"
        userSubmit.value = "Submit"

        let foundDiv = this.foundDiv()
        
        signUpForm.appendChild(emailLbl)
        signUpForm.appendChild(userEmail)
        signUpForm.appendChild(passwordLbl)
        signUpForm.appendChild(userPassword)
        signUpForm.appendChild(firstNameLbl)
        signUpForm.appendChild(userFirstName)
        signUpForm.appendChild(lastNameLbl)
        signUpForm.appendChild(userLastName)
        signUpForm.appendChild(usernameLbl)
        signUpForm.appendChild(userName)
        signUpForm.appendChild(phoneNumberLbl)
        signUpForm.appendChild(phoneNumber)
        signUpForm.appendChild(userSubmit)
        foundDiv.appendChild(signUpForm)

        //render page
        //add a submit click listner
        signUpForm.addEventListener("submit", (e)=> {
            e.preventDefault()
            let promise = this.adapter.fetchCreateUser(this.processCreate(e))
            promise.then((user) => {
                this.loadHomepage(user)
            })
        })
        //this click listner will call an adapter method to create a new acount
    }

    processCreate(e){
        
        let data = {
            email: e.target.email.value,
            password: e.target.password.value,
            firstname: e.target.first_name.value,
            last_name: e.target.last_name.value,
            username: e.target.username.value,
            phone_number: e.target.phone_number.value
        }
        return data
    }

    foundDiv(){
        const foundDiv = document.querySelector("#mainDiv")
        return foundDiv
    }

    loadHomepage(allUserData){
        console.log("LOAD USER PAGE")
        this.clearPage()
        console.log(allUserData)

        this.renderProfileInfo(allUserData)
        this.renderNavButtons()
        this.renderContacts(allUserData.contacts)
        this.renderConvo()        
    } 

    renderProfileInfo(userData){
        let profileDiv = document.createElement("div")
        this.foundDiv().appendChild(profileDiv)

        let infoTag = document.createElement("h3")
        infoTag.innerText = "Profile"

        let userInfo = document.createElement("div")

        let infoName = document.createElement("h4")
        infoName.innerText = `${userData.first_name} ${userData.last_name}`
        
        let infoUsername = document.createElement("h6")
        infoUsername.innerText = `@${userData.username}`

        let infoEmail = document.createElement("p")
        infoEmail.innerText = `email:${userData.email}`

        let infoPhone  = document.createElement("p")
        infoPhone.innerText = `phone:${userData.phone_number}`

        userInfo.appendChild(infoTag)
        userInfo.appendChild(infoName)
        userInfo.appendChild(infoUsername)
        userInfo.appendChild(infoEmail)
        userInfo.appendChild(infoPhone)
        profileDiv.appendChild(userInfo)

    }
    
    renderNavButtons(){   
        let buttonContainer = document.createElement("div")
        this.foundDiv().appendChild(buttonContainer)

        let newContactBtn = document.createElement("button")
        newContactBtn.innerText = "Add Contact"
        buttonContainer.appendChild(newContactBtn)

        newContactBtn.addEventListener("click", (e)=> {
            this.addContactList()
        })

    }

    renderContacts(listOfContacts){
        let contactDiv = document.createElement("div")
        this.foundDiv().appendChild(contactDiv)

        let contactList = document.createElement("ul")

        let contactsTag = document.createElement("h3")
        contactsTag.innerText = "Contacts"
        contactDiv.appendChild(contactsTag)
         console.log("happy")
        for (let user of listOfContacts) {
            let newLi = document.createElement("li")
            let deleteBtn = document.createElement("button")
            deleteBtn.textContent = "X"
            newLi.appendChild(deleteBtn)
            newLi.innerText = `${user.first_name} ${user.last_name}`
            newLi.className = "contactListItem"

            newLi.addEventListener("click", (e)=> {
                console.log(e.target)
            }) 

            contactList.appendChild(newLi)
            newLi.appendChild(deleteBtn)

            
            let myCallback = () => { this.deleteContact(this.userId, user) }
            newLi.addEventListener("click", myCallback)

        }   
        contactDiv.appendChild(contactList)

    }

    renderConvo(){
        console.log("render convos")
    }
    
    addContactList(){
        this.clearPage()
        this.adapter.fetchAllUsers()
        .then(data => {
            this.renderAllUsers(data)
        })
    }


    deleteContact(id, contact){
        console.log(id, contact)

        this.adapter.fetchDeleteContact(id, contact.id)
        .then(data => {
            console.log(data)
            this.loadHomepage(data)
        })

    }

    addContact(id, contact){
        console.log(id, contact)

        this.adapter.fetchCreateContact(id, contact.id)
        .then(data => {
            console.log(data)
            this.loadHomepage(data)

        })

    }

    renderAllUsers(contacts){

        //add back button here
        console.log(contacts)
        let contactListDiv = document.createElement("div")
        this.foundDiv().appendChild(contactListDiv)

        let userUl = document.createElement("ul")

        contacts.forEach(( currContact) =>{
            let newLi = document.createElement("li")
            //newLi.id = currContact.id
            newLi.innerText = `${currContact.first_name} ${currContact.last_name}`
            userUl.appendChild(newLi)
            let myCallback = () => { this.addContact(this.userId, currContact) }
            newLi.addEventListener("click", myCallback)

        })
        contactListDiv.appendChild(userUl)

    }

}


