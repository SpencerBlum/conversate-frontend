
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
        let foundDiv = document.querySelector("#mainDiv")
        return foundDiv
    }

    loadHomepage(data){
        this.clearPage()
        console.log(data)

        // console.log(this.foundDiv())
        let contactsDiv = document.createElement("div")
    }

    
}


