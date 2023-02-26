<template>
  <div class="about">
    <h1>This is an about page</h1>
	<button
    id="logout-button"
    @click.prevent="handleLogout">
    Log out
  </button>
  </div>
</template>

<script>
import Parse from 'parse'
	export default{
	
		methods: {
			handleLogout(){
				const currentUser = Parse.User.current()
				if(currentUser != null){
				Parse.User.logOut(currentUser);
				alert("You are succesfully Logged out")
				this.$router.push("/")
				}
				else{
					alert("You are not logged in")
					this.$router.push("/")
				}
			},
		},
	}
</script>

<style scoped>
  #logout-button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
  }

  #logout-button[disabled] {
    background-color: lightgray;
    color: gray;
  }
</style>