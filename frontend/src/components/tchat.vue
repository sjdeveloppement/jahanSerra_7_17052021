<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-toolbar color="#EF5D60" dark>
          <v-toolbar-title><h1>Messages</h1></v-toolbar-title>

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
            color="#000033"
            @input="$v.message_title.$touch()"
            @blur="$v.message_title.$touch()"
            :error-messages="titleErrors"
            required
          ></v-text-field>
          <v-textarea
            v-model="message_content"
            background-color="grey lighten-2"
            color="#000033"
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
            color="#000033"
            absolute
            style="margin-top: -50px"
            name="choosefile"
            aria-label="choosefile"
          >
            <v-icon dark> mdi-camera </v-icon>
          </v-btn>
          <v-btn
            @click="sendMessage()"
            type="submit"
            depressed
            color="#000033"
            class="white--text"
            name="sendmessage"
            aria-label="sendmessage"
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
            ><v-btn
              color="error"
              name="closeOverlay"
              aria-label="closeOverlay"
              @click="(overlay = false), (likeErr = false)"
            >
              Already liked
            </v-btn></v-overlay
          >
          <template v-for="(message, index) in messages">
            <v-subheader v-if="message.header" :key="message.header" inset>
              {{ message.header }}
            </v-subheader>

            <v-list-item v-else :key="message.message_title" ripple>
              <v-list-item-avatar height="40" width="40">
                <img :src="message.user_image" alt="avatar"  />
              </v-list-item-avatar>

              <v-list-item-content>
                <div>
                  <v-list-item-title
                    style="color: #000033"
                    class="font-weight-bold"
                    v-html="message.user_pseudo"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="message.message_createdat"
                  ></v-list-item-subtitle>
                </div>

                <v-list-item-title 
                  v-html="message.message_title"
                ></v-list-item-title>

                <v-list-item-subtitle style="overflow: auto"
                  v-html="message.message_content"
                ></v-list-item-subtitle>

                <v-img
                  v-if="message.message_image != ''"
                  :src="message.message_image"
                  alt="image post"
                  style="display: flex; justify-content: center"
                />
                <!-- update message btn -->
                <v-btn
                  :key="index"
                  class="mb-10"
                  right
                  bottom
                  fab
                  dark
                  x-small
                  name="updateMessage"
                  aria-label="updateMessage"
                  absolute
                  color="#000033"
                  @click="checkActive(message, index), (dialog = true)"
                >
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>

                <!-- ici commentaires -->
                <v-list id="list-comments" two-line> </v-list>
                <template>
                  <div role="list"
                    v-for="(comment, i) in allComments"
                    :key="comment.message_title"
                  >
                    <v-list-item 
                      v-if="comment.message_id == message.message_id"
                    >
                      <template  >
                        <v-list>
                          <v-list-item-avatar size="40" height="40" width="40">
                            <img role="listitem" :src="comment.user_image" alt="avatar"   />
                          </v-list-item-avatar>

                          <v-list-item-content >
                            <v-list-item-title
                              v-html="comment.user_pseudo"
                            ></v-list-item-title>

                            <v-list-item-subtitle
                              v-text="comment.comment_content"
                              style="overflow: auto"
                            ></v-list-item-subtitle>
                            <v-btn
                              v-if="checkadmin() == true"
                              x-small
                              name="deleteComment"
                              aria-label="deleteComment"
                              absolute
                              :top="$vuetify.breakpoint.smAndDown "
                              :left="$vuetify.breakpoint.smAndDown"
                              :bottom="$vuetify.breakpoint.mdAndUp"
                              :right="$vuetify.breakpoint.mdAndUp"
                              class="mb-10 "
                              fab
                              @click="
                                checkActiveCom(comment, i), deleteComment()
                              "
                              ><v-icon color="#EF5D60">mdi-close</v-icon></v-btn
                            >
                            
                          </v-list-item-content>
                          
                        </v-list>
                      </template>
                    </v-list-item>
                    
                    
                    
                    
                    <v-divider
                      v-if="
                        i < allComments.length - 1 &&
                        comment.message_id == message.message_id
                      "
                      :key="i"
                    ></v-divider>
                    <v-spacer v-if="$vuetify.breakpoint.smAndDown"><br></v-spacer>
                    
                    <!-- fin list commentaires -->
                  </div>
                  <v-btn
                    :key="message.message_id"
                    class="mb-10"
                    left
                    bottom
                    fab
                    dark
                    name="commentOverlay"
                    aria-label="commentOverlay"
                    x-small
                    absolute
                    color="#000033"
                    @click="checkActive(message, index), (dialogcom = true)"
                  >
                    <v-icon dark> mdi-format-list-bulleted-square </v-icon>
                  </v-btn>
                </template>
                <v-spacer></v-spacer>
                <v-divider></v-divider>
                
              </v-list-item-content>

              <!-- compteur de like -->
              <div class="mb-16" v-html="message.message_appreciation"></div>
              <v-btn
                class="mb-16"
                name="like"
                aria-label="like"
                :key="message.message_appreciation"
                icon
                color="#000033"
                @click="likeMessage(message), disabledThump(message)"
                ><v-icon id="like-btn" :disabled="!isActive"
                  >mdi-thumb-up</v-icon
                ></v-btn
              >

              <!-- gere le cas où l'utilisateur est un admin  -->
              <v-btn
                class="mb-16"
                name="deleteMessage"
                aria-label="deleteMessage"
                v-if="checkadmin() == true"
                :key="message.message_id"
                @click="deleteMessage(message)"
                icon
                color="#EF5D60"
                ><v-icon>mdi-cancel</v-icon></v-btn
              >
            </v-list-item>
          </template>
        </v-list>
        
        <!-- dialogs update message -->
        <template v-if="dialog == true && this.selectedMessageUserID == userID">
          <v-row justify="center">
            <v-dialog v-model="dialog" max-width="600px">
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
                          color="#000033"
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
                          color="#000033"
                          required
                          @input="$v.message_content.$touch()"
                          @blur="$v.message_content.$touch()"
                          :error-messages="contentCommentErrors"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          id="upmessage_image"
                          color="#000033"
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
                  <v-btn
                    color="#EF5D60"
                    name="closedialog"
                    aria-label="closedialog"
                    text
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    name="dialogupdatemessage"
                    aria-label="dialogupdatemessage"
                    color="#000033"
                    text
                    @click="updateMessage(), (dialog = false)"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
        <v-overlay id="overlayUpmessage" v-if="dialog == true && this.selectedMessageUserID !== userID" type="error"><v-btn color="error" @click="dialog=!dialog" >Vous pouvez modifier seulement vos messages !</v-btn></v-overlay>
        <!-- dialogs comment -->
        <template v-if="dialogcom == true">
          <v-row justify="center">
            <v-dialog
              v-model="dialogcom"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar dark color="#EF5D60">
                  <v-btn
                    name="closedialog"
                    aria-label="closedialog"
                    icon
                    dark
                    @click="dialogcom = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    >Comments of Message N°
                    {{ selectedMessage }}</v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn
                      dark
                      name="sendcomment"
                      aria-label="sendcomment"
                      text
                      @click="sendComment(), (dialogcom = false)"
                    >
                      Save
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                  <v-subheader>Leave a comment</v-subheader>
                  <v-list-item>
                    <v-list-item-content>
                      <v-textarea
                        v-model="comment_content"
                        label="Comments"
                        hide-details="auto"
                        color="#000033"
                        @input="$v.comment_content.$touch()"
                        @blur="$v.comment_content.$touch()"
                        :error-messages="contentCommentErrors"
                      ></v-textarea>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
        <!--end of dialogs -->
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
    comment_content: { required, alpha },
  },
  data() {
    return {
      modes: {
        emptyContent: false,
        user_isadmin: localStorage.getItem("isadmin"),
      },
      allComments: [{}],
      userID: localStorage.getItem("userID"),
      selectedMessage: null,
      selectedMessageUserID: "",
      isActive: true,
      message_title: "",
      message_content: "",
      message_appreciation: "",
      comment_content: "",
      absolute: true,
      overlay: false,
      
      infos: "",
      comments: [{}],
      iClicked: "",
      dialogcom: false,
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
    contentCommentErrors() {
      const errors = [];
      if (!this.$v.comment_content.$dirty) return errors;
      !this.$v.comment_content.alpha && errors.push("Comment must be a text");
      return errors;
    },
    
  },

  methods: {
    chooseFiles() {
      document.getElementById("message_image").click();
    },
    checkActive(message, index) {
      this.selectedMessage = message.message_id;
      this.selectedMessageUserID = message.user_id;
      this.indexClicked = index;
    },
    checkActiveCom(allComments, i) {
      this.selectedCommentary = allComments.comment_id;
      //this.selectedMessageCom = allComments.message_id;
      this.selectedCommentaryUserID = allComments.user_id;
      this.iClicked = i;
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

      const form = new FormData();
      form.append("message_title", this.message_title);
      form.append("message_content", this.message_content);
      form.append("message_image", message_image);

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
        .put(URL + message_id, updateform, {
          "Content-Type": "multipart/form-data",
        })
        .then(() => {
          message_image = "";
          this.refreshPost();
          document.location.reload();
        })
        .catch((error) => {
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

    getComments() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios
        .get("http://localhost:3000/api/comment/all")
        .then((response) => {
          this.allComments = response.data.result;
        })
        .catch((error) => {
          error;
        });
    },

    deleteMessage(message) {
      const URL = `http://localhost:3000/api/message/${message.message_id}`;

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios.delete(URL).then(() => {
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
          this.refreshPost(message);
          document.location.reload();
        })
        .catch((error) => {
          error, (this.overlay = true), (this.likeErr = true);
        });
    },
    deleteComment() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios
        .delete("http://localhost:3000/api/comment/" + this.selectedCommentary)
        .then(() => {
          this.getComments();
        });
    },

    sendComment() {
      const message_id = this.selectedMessage;
      const commentData = {
        comment_content: this.comment_content,
      };
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios
        .post(
          "http://localhost:3000/api/comment/create/" + message_id,
          commentData
        )
        .then(() => {
          this.comment_content = "";
          this.getComments();
        });
    },
  },
  mounted() {
    this.getMessages();
    this.getComments();
  },
};
</script>