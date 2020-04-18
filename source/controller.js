//make routes for users/:id
//make controller method
//add fetch call to adapter
//create a back method that calls the fetsh and passes into load homepage
//add a physical button to the convo page
//move on and do other stuff




//login other user to see updated convo
//new convo
//create back end route to accept an id and only return all contacts that is not him or already on his list







class Controller{

    constructor(){
        this.adapter = new Adapter()
    }
    renameMe(){
        this.adapter.fetchOneUser(window.localStorage['user_id'])
        .then(data =>  {
            
            this.userId = window.localStorage['user_id']
            this.loadHomepage(data) 
        })
    }

    logOutBtn(){

        let logoutBtn = document.createElement("button")
        logoutBtn.innerText = "<logout"
        logoutBtn.className = "btn btn-primary"
        this.foundDiv().appendChild(logoutBtn)
        logoutBtn.addEventListener("click", ()=>{
        window.localStorage.clear()
        this.clearPage()
        this.initialize()
    
    } )
    }


    initialize(){
        //console.log(window.localStorage["user"])
        if (window.localStorage["user_id"] != undefined){
            this.renameMe()
    
        }else{
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
        userSubmit.className = "btn btn-primary"


        signInForm.addEventListener("submit", (e) => {
            e.preventDefault()
            this.loginUser(e)

        })

        createAccountBtn.innerText = "Create Account"
        createAccountBtn.id = "create-account"
        createAccountBtn.className = "btn btn-primary"
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
            window.localStorage['user_id'] = user.id
            this.loadHomepage(user)
        }
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
        userSubmit.className = "btn btn-primary"

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
                if (user.message === 'Loggin Failed'){
                    window.alert(user.message)
                } else {
                    this.loadHomepage(user)
                }
            })
        })
        //this click listner will call an adapter method to create a new acount
    }

    processCreate(e){
        
        let data = {
            email: e.target.email.value,
            password: e.target.password.value,
            first_name: e.target.first_name.value,
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
       
        this.clearPage()
        this.logOutBtn()
        console.log(allUserData)

        this.renderProfileInfo(allUserData)
        this.renderNavButtons()
        this.renderContacts(allUserData.contacts)
        this.renderConvo(allUserData)        
    } 


    renderProfileInfo(userData){
        let profileDiv = document.createElement("div")
        this.foundDiv().className = "divstyle"
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
        newContactBtn.className = "btn btn-primary"
        buttonContainer.appendChild(newContactBtn)

        newContactBtn.addEventListener("click", (e)=> {
            this.addContactList()
        })
    }

    renderContacts(listOfContacts){
        let contactDiv = document.createElement("div")
        this.foundDiv().appendChild(contactDiv)

        let contactList = document.createElement("ul")
        contactList.style.listStyle = "none"

        let contactsTag = document.createElement("h3")
        contactsTag.innerText = "Contacts"

        let createConvoBtn = document.createElement("button")
            createConvoBtn.textContent = "New Conversation"
            createConvoBtn.className = "btn btn-primary"
            contactDiv.appendChild(createConvoBtn)

            // let convoCallBack = () => { this.addConversation(this.userId)}

            let convoCallBack = () => { this.getNotInConvoContacts(this.userId)}

            createConvoBtn.addEventListener("click", convoCallBack)


        contactDiv.appendChild(contactsTag)
        console.log("happy")
        for (let user of listOfContacts) {
            let newLi = document.createElement("li")
            let deleteBtn = document.createElement("button")
            deleteBtn.textContent = "x"
            deleteBtn.className = "btn btn-primary"
            
            
            newLi.innerText = `${user.first_name} ${user.last_name}`
            newLi.className = "contactListItem"

            contactList.appendChild(newLi)
            newLi.appendChild(deleteBtn)
            

            let myCallback = () => { this.deleteContact(this.userId, user) }
            deleteBtn.addEventListener("click", myCallback)
        }   
        contactDiv.appendChild(contactList)

    }

    getNotInConvoContacts(userId){
        console.log(userId)

        this.adapter.fetchUsersNoConvo(userId)
        .then(resp => {
            console.log(resp)
            this.renderNotInConvoContacts(resp)

        })
        

    }

    renderNotInConvoContacts(data){
        this.clearPage()
        this.renderBackBtn()
        let newUl = document.createElement("ul")
        this.foundDiv().appendChild(newUl)
        data.forEach(user => {
            
            let newLi = document.createElement("li")
            newLi.innerHTML = `${user.first_name} ${user.last_name}`
            newUl.appendChild(newLi)
            newLi.style.listStyle = "none"

            let startConvoBtn = document.createElement("button")
            startConvoBtn.innerText = "message"
            startConvoBtn.className = "btn btn-primary"
            newLi.appendChild(startConvoBtn)
            

            startConvoBtn.addEventListener("click", () => {
            this.addConversation(user)
            })
        })
    }

    addConversation(user){
        let data = {
            from_user_id: this.userId,
            to_user_id: user.id
        }
        this.adapter.fetchNewConversation(data)
        .then(resp => {
        this.renderChatPage(resp)
        })   
    }


    renderConvo(data){
        let convoDiv = document.createElement("div")
        this.foundDiv().appendChild(convoDiv)

        let conversationsLbl = document.createElement("h4")
        conversationsLbl.innerText = "Conversations"
        convoDiv.appendChild(conversationsLbl)

        let newUl = document.createElement("ul")
        newUl.className = "list-group"
        convoDiv.appendChild(newUl)
        // newUl.style.listStyle = "none"
        data.conversations.forEach(convo => {
            console.log(convo)
            let newLi = document.createElement("li")
            newLi.className = "list-group-item"
            newLi.innerText = `${convo.first_name} ${convo.last_name}`
            newUl.appendChild(newLi)
            let myCallback = () => { this.loadSpecifcChat(convo.conversation_id) }
            newLi.addEventListener("click", myCallback)
        })
    }

    loadSpecifcChat(convo_id){
        this.adapter.fetchAllConversations(convo_id)
        .then(data => {

        console.log(data)  
       
        this.renderChatPage(data)

        })
        //fetch for chat data 
        //pass chat data into renderchat page
    }


    renderBackBtn(){
        let backBtn = document.createElement("button")
        backBtn.innerText = "<back"
        backBtn.className = "btn btn-primary"
        this.foundDiv().appendChild(backBtn)

        backBtn.addEventListener("click", () => {
            console.log(this.userId)
            this.adapter.fetchOneUser(this.userId)
            .then(resp => {
                this.loadHomepage(resp)
            })
        })
    }

    renderChatPage(data){
        this.clearPage()
        
        let topDiv = document.createElement("div")
        let nameLabel = document.createElement("h5")
        nameLabel.innerText = `Chat with ${data.user_id.first_name} ${data.user_id.last_name}`
        topDiv.appendChild(nameLabel)

        this.renderBackBtn()

        this.foundDiv().appendChild(topDiv)

        let chatDiv = document.createElement("div")
        
        let chatUl = document.createElement("ul")
        chatUl.id = "chat-ul"
        //do list stuff
        console.log("test nsdfsfsdfsdfdf")
        console.log(data)
        data.messages.forEach(chat => {
            
            let messageLi = document.createElement("li")
            messageLi.className = "message"
            messageLi.innerText = `${chat.name.first_name} ${chat.name.last_name} - ${chat.message}`
            chatUl.appendChild(messageLi)
        })
        chatDiv.appendChild(chatUl)
        this.foundDiv().appendChild(chatDiv)
        
        let formDiv = document.createElement("div")
        let form = document.createElement("form")
        let chatInput = document.createElement("input")
        let userSubmit = document.createElement("input")

        chatInput.name = "message"
        chatInput.placeholder = "Type here..."

        userSubmit.type = "submit"
        userSubmit.className = "btn btn-primary"
        userSubmit.value = "send"

        this.foundDiv().appendChild(formDiv)
        formDiv.appendChild(form)
        form.append(chatInput, userSubmit)

        let myCallback = (mess) => {this.renderMessage(mess, data) }
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            myCallback(e.target.message.value)
        })
    }

    renderMessage(mess, convoData ){
        console.log(mess)
        console.log(convoData)
        let data = {
            user_id: this.userId, 
            conversation_id: convoData.id,
            message: mess
        }
        this.adapter.fetchNewMessage(data)
        .then(resp => {
            
            this.renderChatPage(resp)
        
        })
    }

    addContactList(){
        this.clearPage()
        this.adapter.fetchAllUsers(this.userId)
        .then(data => {
            console.log(data)
            this.renderAllUsers(data)
        })
    }

    deleteContact(id, contact){

        this.adapter.fetchDeleteContact(id, contact.id)
        .then(data => {
            this.loadHomepage(data)
        })

    }

    addContact(id, contact){ 
        this.adapter.fetchCreateContact(id, contact.id)
        .then(data => {
            this.loadHomepage(data)
        })
    }



    renderAllUsers(contacts){
        this.renderBackBtn()
        let contactListDiv = document.createElement("div")
        this.foundDiv().appendChild(contactListDiv)

        let userUl = document.createElement("ul")
        userUl.className = "list-group"
        // userUl.style.listStyle = "none"

        contacts.forEach(( currContact) =>{
            let newLi = document.createElement("li")
            newLi.className = "list-group-item"
            //newLi.id = currContact.id
            newLi.innerText = `${currContact.first_name} ${currContact.last_name}`
            userUl.appendChild(newLi)
            let myCallback = () => { this.addContact(this.userId, currContact) }
            newLi.addEventListener("click", myCallback)
        })
        contactListDiv.appendChild(userUl)
    }
}


