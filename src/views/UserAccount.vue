<template>
<h1>FORMS</h1>
<form>
    <label>Email:</label>
    <input type="email" required v-model="email">

    <label>Password: </label>
    <input type="password" required v-model="password">

    <label>User Name: </label>
    <input type="string" required v-model="username">

    <label>First Name: </label>
    <input type="string" required v-model="firstname">
    <label>Middle Name: </label>
    <input type="string" required v-model="middlename">
    <label>Last Name: </label>
    <input type="string" required v-model="lastname">

    <div class="radio">
        <label>Sex: </label>
        <input type="radio" name="gender" value="male" required v-model="sex">
        <label>Male</label>
        <input type="radio" name="gender" value="female" required v-model="sex">
        <label>Female</label>

    </div>
    <label>Position: </label>
    <input type="string" required v-model="position">

    <label>Office/Department: </label>
    <input type="string" required v-model="office">

    <div class="submit">
        <button @click="createUser()">Create Account</button>
    </div>
</form>
</template>

<script>
import Parse from 'parse'

export default {
    data() {
        return {
            email: "",
            password: "",
            firstname: "",
            middlename: "",
            lastname: "",
            username: "",
            sex: [],
            position: "",
            office: "",
            passwordError: "",
            success: false,
        }
    },
    methods: {
        async createUser() {
            //Adding
            const useraccount = new Parse.User(); //Create user

            useraccount.set("email", this.email)
            useraccount.set("password", this.password)
            useraccount.set("username", this.username)
            useraccount.set("firstname", this.firstname)
            useraccount.set("middlename", this.middlename)
            useraccount.set("lastname", this.lastname)
            useraccount.set("sex", this.sex)
            useraccount.set("position", this.position)
            useraccount.set("office", this.office)
            try {
                await useraccount.signUp();
                alert("USER ACCOUNT SUCCEFULLY CREATED!")
                // Hooray! Let them use the app now.
            } catch (error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        },
    },
}
</script>

<style scoped>
input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border: 1px solid black;
    color: #555;
}

form {
    max-width: 420px;
    margin: 30px auto;
    background: lightgrey;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    border: 2px solid grey;
}

button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}

label,
p,
a {
    color: black;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.65em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input[type="radio"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 20px;
    position: relative;
    top: 2px;
}

.radio {
    font-size: 1em;
    font-weight: none;
}

.submit {
    text-align: center;
}
</style>
