<template>
  <nav>
    <div v-if="this.$route.path !=='/'">
      
    <router-link :to="{name: 'dashBoard'}">Dashboard</router-link> |
    <router-link :to="{name: 'userAccount'}">Form</router-link> |
    <router-link :to="{name:'workflowInitiation'}">Workflow</router-link> |
    <router-link :to="{name: 'approvalPage'}">APPROVAL</router-link> |
    <router-link to="/about">Logout</router-link> |
    </div>
    </nav>
  <h1 v-if="this.$route.path =='/'">LOGIN PAGE</h1>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
  import Parse from 'parse'
  Parse.serverURL = "http://localhost:1337/api"
  Parse.initialize("super", "jspass")
  export default {

  }
</script>