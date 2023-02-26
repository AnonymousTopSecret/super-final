<template>
  <div class="home">
    <form @submit.prevent="userLogin()" method="post">
    <label>Email: </label>
    <input type="email" v-model="email" required>
    
    <label>Password: </label>
    <input type="password" required v-model="password">
    
    <div class="login">
        <button type="submit">Login</button>
    </div>
    </form>
  </div>
</template>

<script>
import Parse from 'parse'
export default {
  name: 'HomeView',
  data(){
	return {
		email: "",
		password: "",
		}
	},
	methods: {
		async userLogin(){
		// eslint-disable-next-line
			const userCurrent = await Parse.User.logIn(this.email, this.password).then((userCurrent) => {
				alert("User Succesfully Logged In!!\n" + "Welcome, " + userCurrent.getEmail()) //notify user that succesfull logged in
				this.$router.push({name: 'dashBoard'}) //redirects user to any page you want here its the about page
			}, (error) => {
				alert("Hey!!! =>" + error.message) //if something error
			})
			}
	},
}
</script>

<style>
input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border: 1px solid black;
    color: #555;
  }
  .home{
    max-width: 420px;
    margin: 30px auto;
    background: lightgrey;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
	border: 2px solid grey;
  }
  .login{
	text-align: center;
	margin-top: 30px;
  }
  .login button{
	background-color: blue;
    color: white;
    border: none;
    padding: 5px 10px;
  }

</style>
