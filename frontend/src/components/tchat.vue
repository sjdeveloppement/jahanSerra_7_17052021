<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-toolbar color="#D1515A" dark>
          <v-toolbar-title>Messages</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <!-- Form Message -->
        <v-form
          ><v-text-field
            v-model="message_title"
            name="message_title"
            class="mt-6"
            id="message_title"
            label="title"
            background-color="grey lighten-2"
            color="#122441"
          ></v-text-field>
          <v-textarea
            v-model="message_content"
            background-color="grey lighten-2"
            color="#122441"
            label="Message"
          >
          </v-textarea>
          <v-file-input
            id="fileUpload"
            accept=".png, .jpeg, .jpg, .gif"
            show-size
            label="File input"
            style="display: none"
          ></v-file-input>
          <v-btn
            @click="chooseFiles()"
            class="mx-16"
            fab
            dark
            color="#122441"
            absolute
            style="margin-top: -50px"
          >
            <v-icon dark> mdi-camera </v-icon>
          </v-btn>
          <v-btn
            type="submit"
            depressed
            color="#122441"
            class="white--text"
            absolute
            style="margin-top: -40px; margin-left: 75%"
            >Send</v-btn
          ></v-form
        >

        <v-list three-line>
          <template v-for="(message, index) in messages">
            <v-subheader v-if="message.header" :key="message.header" inset>
              {{ message.header }}
            </v-subheader>

            <v-divider v-else-if="message.divider" :key="index" inset></v-divider>

            <v-list-item v-else :key="message.message_title" ripple>
              <v-list-item-avatar>
                <img :src="message.user_image" />
              </v-list-item-avatar>
              
              <v-list-item-content>
                <div><v-list-item-title  style="color:#D1515A" v-html="message.user_pseudo"></v-list-item-title>
                <v-list-item-subtitle v-html="message.message_createdat"></v-list-item-subtitle>
                </div>
                
                <v-list-item-title v-html="message.message_title"></v-list-item-title>
                
                <v-list-item-subtitle
                  v-html="message.message_content"
                ></v-list-item-subtitle>
                
                  <v-img v-if="message.message_image != ''" :src="message.message_image" style="width: 25%"
                />
                <br>
                
                
                  <v-card v-if="message.comments != ''" style="display:flex; justify-content: space-between"
                    ><div style="box-shadow: 1px 1px 10px #D1515A"><v-list-item-avatar
                      ><v-img :src="message.avatarcomment"
                    /></v-list-item-avatar>
                    <p v-html="message.pseudocomment"></p></div>
                    <div class="ml-2"> 
                    <p v-html="message.comments"></p></div>
                   </v-card
                >

                <v-spacer></v-spacer>
                <v-text-field
                  v-model="comment_content"
                  label="Comments"
                  hide-details="auto"
                ></v-text-field>
              </v-list-item-content>
              

              <v-btn
                icon
                color="#D1515A"
                @click="(showHideThumbUp = false), disabledThump()"
                ><v-icon id="like-btn" v-show="showHideThumbUp"
                  >mdi-thumb-up</v-icon
                ></v-btn
              ><!-- gere le cas où l'utilisateur est un admin  -->
              <v-btn v-if="checkadmin() == true" icon color="#D1515A"
                ><v-icon>mdi-cancel</v-icon></v-btn
              >
            </v-list-item>
          </template>
        </v-list>
        {{messages[0]}}
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
const axios = require("axios");
export default {
  name: "tchat",
  props: ["tchatData"],
  data() {
    return {
      modes:{
        allComments: [],
        comment_content: '',
        emptyContent: false,
        user_isadmin: localStorage.getItem('isadmin'),
      },
      message_title:'',
      message_content:'',
      comment_content:'',

      infos:'',
      messages: [
        // ici ce sera l'affichage des objets de la requete comme message_title, message_content mais aussi user_image et comment_content
        {
          header: "Posted",
        },
        { divider: true },
        
        
      ],
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      showHideThumbUp: true,
      deleteAccepted: false,
    };
  },
  computed:{
    messagesTchat(){
      return this.$store.state.messagesFromVueX;
    },
    
  },
  methods: {
    chooseFiles() {
      document.getElementById("fileUpload").click();
    },
    disabledThump() {
      console.log("ici je dois désactiver le btn like");
    },
    checkadmin() {
      if (localStorage.getItem("isadmin") == 1) {
        return true;
      } else {
        return false;
      }
    },
    
   /* //refresh post when add new one notifyParent()
    refreshPost(){
      this.$emit("refresh");
    },*/
    //methode pour update les messages
    getMessages(){
      const URL = "http://localhost:3000/api/message";
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.get(URL).then(response => (this.messages = response.data.message))
      .catch(error => console.log(error))
    },
    //fonctionnalitées à finir
   /* deletePost(){
      const message_id = this.tchatData.message_id;
      const getUserID = localStorage.getItem('userID');
      const URL = `http://localhost:3000/api/message/${message_id}`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.delete(URL).then(()=>{
        console.log("message supprimé");
        this.refreshPost();
      });
    },
    deleteComment(comment_id){
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.delete("http://localhost:3000/api/comment/"+ comment_id)
      .then(()=>{
        console.log("Commentaire supprimé");
        this.getComments();
      });
    },
    getComments(){
      const message_id = this.tchatData.message_id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.get("http://localhost:3000/api/comment/"+ message_id)
      .then((response)=>{
        this.allComments = response.data.comments
      });
      
    },
    sendComment(){
      if(!this.comment_content){
        this.emptyContent = true;
        return console.log("commentary can't be empty");
      }
      const message_id = this.tchatData.message_id;
      const commentData = {
        message_id: this.tchatData.message_id,
        message_content: this.message_content,
        user_id: localStorage.getItem('userID'),
      };
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.post("http://localhost:3000/api/comment/create/"+ message_id, commentData)
      .then(()=>{
        this.comment_content ='';
        this.getComments();
      });
    },*/
    
  },
  mounted(){
      //this.getComments();
      this.getMessages();
      
    },
};
</script>