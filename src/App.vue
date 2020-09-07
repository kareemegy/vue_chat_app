<template>
  <div id="app">
    <!-- Login section -->
    <div class="login mt-5" v-if="!name">
      <h3 class="mt-5">Join Chat</h3>
      <label for="username">Enter Your Name:</label>
      <br />
      <input
        class="mb-3"
        type="text"
        @keyup.enter="updateUsername"
        v-model="userName"
      />
      <br />
      <button class="btn btn-primary" @click="updateUsername">Join Chat</button>
    </div>

    <!-- Chat section -->
    <div class="message-body mt-3" v-else>
      <h3>Chat</h3>
      <h5>Welcome {{ name }}!</h5>
      <div class="card">
        <div class="card-body">
          <div
            class="border pl-2 pt-1 ml-2 message-text mb-2"
            v-for="message in messages"
            :key="message"
          >
            <span class="mg-text">{{ message.username }}</span>
            <p class="message pt-1">{{ message.text }}</p>
          </div>
        </div>
      </div>
      <div class="sendMSg_body">
        <input
          v-model="showMessage"
          @keyup.enter="sendMessage"
          type="text"
          class="mt-3 mr-2 pl-2 pr-2"
        />
        <button class="btn btn-primary" @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import fire from "./fire";
export default {
  name: "App",
  data() {
    return {
      userName: "",
      name: null,
      showMessage: "",
      messages: [],
    };
  },
  methods: {
    updateUsername() {
      this.name = this.userName;
      console.log(this.userName);
      this.userName = "";
    },
    sendMessage() {
      const message = {
        text: this.showMessage,
        username: this.name,
      };
      if (message.text == "") {
        return;
      }
      fire
        .database()
        .ref("messages")
        .push(message);
      this.showMessage = "";
    },
  },
  mounted() {
    let viewMessage = this;
    const itemsRef = fire.database().ref("messages");
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text,
        });
      });
      viewMessage.messages = messages;
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons");
#app {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
}
.login {
  background: #fff;
  width: 40%;
  height: 50vh;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
}
h3 {
  font-size: 30px;
  text-align: center;
}
h5 {
  text-align: center;
}
input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  padding-left: 2px;
  padding-right: 2px;
}
.message-body {
  width: 100%;
  margin:  auto;
}
.message-text {
  min-width: 10%;
  border-radius: 4px;
}
.message {
  font-size: 14px;
}
.mg-text {
  color: rgb(0, 195, 255);
  font-weight: bolder;
}
.message-body input {
  width: 80%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  height: 6vh;
  padding-left: 2px;
  padding-right: 2px;
}
.card {
  width: 100%;
  height: 75vh;
  margin: auto;
}
.card-body {
  min-height: 50vh;
  overflow-x: scroll;
}
.sendMSg_body {
  display: flex;
  justify-content: center;
}

.sendMSg_body button{
  margin-top: 15px;
}
</style>
