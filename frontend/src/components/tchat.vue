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
            name="file"
            type="file"
            id="message_image"
            accept=".png, .jpeg, .jpg, .gif"
            show-size
            label="File input"
            style="display: none"
            @change="fileUpload($event)"
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
            @click="sendMessage()"
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
          <v-overlay  v-if="likeErr == true" :absolute="absolute" 
          :value="overlay"><v-btn
            color="error"
            @click="overlay = false, likeErr=false"
          >
            Already liked
          </v-btn></v-overlay>
          <template v-for="(message, index) in messages"  >
            <v-subheader v-if="message.header" :key="message.header" inset>
              {{ message.header }}
            </v-subheader>

            <v-divider
              v-else-if="message.divider"
              :key="index"
              inset
            ></v-divider>

            <v-list-item v-else :key="message.message_title" ripple>
              <v-list-item-avatar>
                <img :src="message.user_image" />
              </v-list-item-avatar>

              <v-list-item-content>
                <div>
                  <v-list-item-title
                    style="color: #d1515a"
                    v-html="message.user_pseudo"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="message.message_createdat"
                  ></v-list-item-subtitle>
                </div>

                <v-list-item-title
                  v-html="message.message_title"
                ></v-list-item-title>

                <v-list-item-subtitle
                  v-html="message.message_content"
                ></v-list-item-subtitle>
                <div style="max-height: 400px;  display:flex; justify-content: center" ><v-img
                  v-if="message.message_image != ''"
                  :src="message.message_image"
                  style="width:100%"
                /></div>
                
                <br />
                <!-- <div v-if="message.comments != ''" > 
                <v-card 
                  
                  style="display: flex; justify-content: space-between"
                  ><div style="box-shadow: 1px 1px 10px #d1515a">
                    <v-list-item-avatar
                      ><v-img :src="message.avatarcomment"
                    /></v-list-item-avatar>
                    <p v-html="message.pseudocomment"></p>
                  </div>
                  <div class="ml-2">
                    <p v-html="message.comments"></p>
                  </div>
                </v-card></div>-->

                <v-spacer></v-spacer>
                <!-- système de commentaire à faire après le mvp 
                <v-text-field
                  v-model="comment_content"
                  label="Comments"
                  hide-details="auto"
                ></v-text-field>-->
                <v-spacer></v-spacer>
                <v-divider></v-divider>
              </v-list-item-content>
              
              <!-- compteur de like -->
              <div  v-html="message.message_appreciation"></div>
              <v-btn
                :key="message.message_appreciation"
                
                icon
                color="#D1515A"
                @click=" likeMessage(message), disabledThump(message) "
                ><v-icon  id="like-btn" :disabled="!isActive"
                  >mdi-thumb-up</v-icon
                ></v-btn
              >
              
              <!-- gere le cas où l'utilisateur est un admin  -->
              <v-btn v-if="checkadmin() == true"
               :key="message.message_id" 
               @click="deleteMessage(message)" 
                icon color="#D1515A"
                ><v-icon  >mdi-cancel</v-icon></v-btn
              >
            </v-list-item>
          </template>
        </v-list>
        
      </v-card>
    </v-col>
  </v-row>
  
</template>
<script>
import FormData from 'form-data';
const axios = require("axios");
export default {
  name: "tchat",
  props: ["tchatData"],
  data() {
    return {
      modes: {
        allComments: [],
        comment_content: "",
        emptyContent: false,
        user_isadmin: localStorage.getItem("isadmin"),
      },
      isActive: true,
      message_title: "",
      message_content: "",
      message_appreciation: "",
      comment_content: "",
      absolute: true,
      overlay: false,
      
      infos: "",
      comments:[],
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
      likeErr: false,
      
    };
  },
  
  methods: {
    chooseFiles() {
      document.getElementById("message_image").click();
    },
    disabledThump(message) {
     //message.message_id = document.getElementById('like-btn').value;
      console.log(message);
      //this.isActive= false;  //disabling the like btn
     
    },
    checkadmin() {
      if (localStorage.getItem("isadmin") == 1) {
        return true;
      } else {
        return false;
      }
    },

     //refresh post when add new one notifyParent()
    refreshPost(){
      this.$emit("refresh");
    },
    fileUpload(event){
      
      this.fileUpload = event.target.files[0];
      
    },
    sendMessage(){
      const URL = "http://localhost:3000/api/message/create";
      // utilisation de formdata pour le json et les fichiers simultanément
      
      let message_image = document.querySelector('#message_image').files[0];
     // console.log(message_image);
      const form = new FormData();
      form.append("message_title", this.message_title);
      form.append("message_content", this.message_content);
      form.append("message_image", message_image);
      //console.log(form);
      
      
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      //indique si les demandes de contrôle d'accès intersites doivent être effectuées à l'aide des informations d'identification
      axios.default.withCredentials = true;
      
      axios.post(URL, form, {"Content-Type":"multipart/form-data"})
      .then((response)=>{
        message_image="";
        this.refreshPost();
        console.log(response);
        
      })
      .catch((error)=>{
        console.log(error);
      })
    },
    //methode pour update les messages
    getMessages() {
      const URL = "http://localhost:3000/api/message";
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios
        .get(URL)
        .then((response) => (this.messages = response.data.message))
        .catch((error) => console.log(error));
    },

    /*getComments(){
      const message_id = this.tchatData.message_id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.get("http://localhost:3000/api/comment/comment/"+ message_id)
      .then((response)=>{
        this.allComments = response.data.comments
      })
      .catch((error) => console.log(error));
      
    },*/
    //fonctionnalitées à finir
     deleteMessage(message){

      //const message_id = this.message.message_id;
      //const getUserID = localStorage.getItem('userID');
      const URL = `http://localhost:3000/api/message/${message.message_id}`;
      
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.delete(URL).then(()=>{
        console.log("message supprimé");
        this.refreshPost(message);
        document.location.reload();
      });
    },
    likeMessage(message){
      
      const URL = `http://localhost:3000/api/message/${message.message_id}/appreciation`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.post(URL).then(()=>{
        console.log(message);
        this.refreshPost(message);
        document.location.reload();
      }).catch((error)=>{
        error,this.overlay=true, this.likeErr=true
      
      })
    },/*
    deleteComment(comment_id){
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.delete("http://localhost:3000/api/comment/"+ comment_id)
      .then(()=>{
        console.log("Commentaire supprimé");
        this.getComments();
      });
    },*/
    /*
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
  mounted() {
    this.getMessages();
    //this.getComments();
  },
};
</script>