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
            @input="$v.message_title.$touch()"
            @blur="$v.message_title.$touch()"
            :error-messages="titleErrors"
            required
          ></v-text-field>
          <v-textarea
            v-model="message_content"
            background-color="grey lighten-2"
            color="#122441"
            label="Message"
            @input="$v.message_content.$touch()"
            @blur="$v.message_content.$touch()"
            :error-messages="contentErrors"
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
          <v-overlay
            v-if="likeErr == true"
            :absolute="absolute"
            :value="overlay"
            ><v-btn color="error" @click="(overlay = false), (likeErr = false)">
              Already liked
            </v-btn></v-overlay
          >
          <template v-for="(message, index) in messages">
            <v-subheader v-if="message.header" :key="message.header" inset>
              {{ message.header }}
            </v-subheader>

            

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
                <div
                  style="
                    max-height: 400px;
                    display: flex;
                    justify-content: center;
                  "
                >
                  <v-img
                    v-if="message.message_image != ''"
                    :src="message.message_image"
                    style="width: 100%"
                  />
                </div>

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
                <!-- update message btn -->
                        <v-btn
                          :key="index"
                          class="mb-6"
                          right
                          bottom
                          fab
                          dark
                          x-small
                          absolute
                          color="#122441"
                          @click=" checkActive(message, index), dialog = true"


                        >
                          <v-icon dark> mdi-pencil </v-icon>
                        </v-btn>
               
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
              <div v-html="message.message_appreciation"></div>
              <v-btn
                :key="message.message_appreciation"
                icon
                color="#D1515A"
                @click="likeMessage(message), disabledThump(message)"
                ><v-icon id="like-btn" :disabled="!isActive"
                  >mdi-thumb-up</v-icon
                ></v-btn
              >

              <!-- gere le cas où l'utilisateur est un admin  -->
              <v-btn
                v-if="checkadmin() == true"
                :key="message.message_id"
                @click="deleteMessage(message)"
                icon
                color="#D1515A"
                ><v-icon>mdi-cancel</v-icon></v-btn
              >
            </v-list-item>
          </template>
        </v-list>
         <!-- dialogs -->
                <template v-if="dialog==true" >
                  
                  <v-row justify="center">
                    
                    <v-dialog v-model="dialog"  max-width="600px">
                      <template >
                        
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Update my message</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  id="upmessage_title"
                                  v-model="message_title"
                                  label="Message Title*"
                                  color="#122441"
                                  required
                                  @input="$v.message_title.$touch()"
                                  @blur="$v.message_title.$touch()"
                                  :error-messages="titleErrors"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4"> </v-col>

                              <v-col cols="12">
                                <v-textarea
                                  id="upmessage_content"
                                  v-model="message_content"
                                  label="Message content*"
                                  color="#122441"
                                  required
                                  @input="$v.message_content.$touch()"
                                  @blur="$v.message_content.$touch()"
                                  :error-messages="contentErrors"
                                ></v-textarea>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  id="upmessage_image"
                                  color="#122441"
                                  label="Message image*"
                                  type="file"
                                  required
                                  @change="fileUpload($event)"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="#D1515A" text @click="dialog = false">
                            Close
                          </v-btn>
                          <v-btn
                            color="#122441"
                            text
                            @click="updateMessage(), (dialog = false) "
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>
                <!-- end of dialogs -->
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, helpers } from "vuelidate/lib/validators";
import FormData from "form-data";
const axios = require("axios");
const alpha = helpers.regex("alpha", /^[a-zéèùâûêîôàùç?!'"\d\-_\s]+$/i);
export default {
  name: "tchat",
  props: ["tchatData"],
  mixins: [validationMixin],

  validations: {
    message_title: { required, alpha },
    message_content: { required, alpha },
  },
  data() {
    return {
      modes: {
        allComments: [],
        comment_content: "",
        emptyContent: false,
        user_isadmin: localStorage.getItem("isadmin"),
      },
      selectedMessage: null,
      isActive: true,
      message_title: "",
      message_content: "",
      message_appreciation: "",
      comment_content: "",
      absolute: true,
      overlay: false,

      infos: "",
      comments: [],
      dialog: false,
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
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.message_title.$dirty) return errors;
      !this.$v.message_title.alpha && errors.push("title must be alphaNumeric");
      return errors;
    },
    contentErrors() {
      const errors = [];
      if (!this.$v.message_content.$dirty) return errors;
      !this.$v.message_content.alpha && errors.push("text only");
      return errors;
    },
  },

  methods: {
    chooseFiles() {
      document.getElementById("message_image").click();
    },
    checkActive(message,index){
      this.selectedMessage = message.message_id;
      this.indexClicked = index;
      console.log(this.selectedMessage);
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
    refreshPost() {
      this.$emit("refresh");
    },
    fileUpload(event) {
      this.fileUpload = event.target.files[0];
    },
    sendMessage() {
      const URL = "http://localhost:3000/api/message/create";
      // utilisation de formdata pour le json et les fichiers simultanément

      let message_image = document.querySelector("#message_image").files[0];
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

      axios
        .post(URL, form, { "Content-Type": "multipart/form-data" })
        .then((response) => {
          message_image = "";
          this.refreshPost();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //update message
    updateMessage() {
      const URL = "http://localhost:3000/api/message/";
      let message_image = document.querySelector("#upmessage_image").files[0];
      let message_id = this.selectedMessage;
      const updateform = new FormData();
      updateform.append("message_title", this.message_title);
      updateform.append("message_content", this.message_content);
      updateform.append("upmessage_image", message_image);
       axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      //indique si les demandes de contrôle d'accès intersites doivent être effectuées à l'aide des informations d'identification
      axios.default.withCredentials = true;
      axios
        .put(URL + message_id, updateform, { "Content-Type": "multipart/form-data" })
        .then(() => {
          message_image = "";
          this.refreshPost();
          document.location.reload();
        })
        .catch((error) => {
          console.log(message_id)
          console.log(error);
        });
    },
    //methode pour get les messages
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
    deleteMessage(message) {
      //const message_id = this.message.message_id;
      //const getUserID = localStorage.getItem('userID');
      const URL = `http://localhost:3000/api/message/${message.message_id}`;

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios.delete(URL).then(() => {
        console.log("message supprimé");
        this.refreshPost(message);
        document.location.reload();
      });
    },
    likeMessage(message) {
      const URL = `http://localhost:3000/api/message/${message.message_id}/appreciation`;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios
        .post(URL)
        .then(() => {
          console.log(message);
          this.refreshPost(message);
          document.location.reload();
        })
        .catch((error) => {
          error, (this.overlay = true), (this.likeErr = true);
        });
    } /*
    deleteComment(comment_id){
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.delete("http://localhost:3000/api/comment/"+ comment_id)
      .then(()=>{
        console.log("Commentaire supprimé");
        this.getComments();
      });
    },*/,
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