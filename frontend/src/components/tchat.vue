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
            class="mt-6"
            id="Message_title"
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
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header" inset>
              {{ item.header }}
            </v-subheader>

            <v-divider v-else-if="item.divider" :key="index" inset></v-divider>

            <v-list-item v-else :key="item.title" ripple>
              <v-list-item-avatar>
                <img :src="item.avatar" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
                <v-list-item-image v-if="item.img != ''">
                  <v-img :src="item.img" style="width: 25%"
                /></v-list-item-image>
                
                <br>
                
                <v-list-item-comments  v-if="item.comments != ''"
                  ><v-card style="display:flex; justify-content: space-between"
                    ><div style="box-shadow: 1px 1px 10px #D1515A"><v-list-item-avatar
                      ><v-img :src="item.avatarcomment"
                    /></v-list-item-avatar>
                    <p v-html="item.pseudocomment"></p></div>
                    <div class="ml-2"> 
                    <p v-html="item.comments"></p></div>
                   </v-card
                ></v-list-item-comments>

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
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
//const axios = require("axios");
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
      items: [
        // ici ce sera l'affichage des objets de la requete comme message_title, message_content mais aussi user_image et comment_content
        {
          header: "Posted",
        },
        { divider: true },
        {
          avatar: "https://picsum.photos/250/300?image=660",
          title: "Meeting @ Noon",
          subtitle: `<span class="font-weight-bold">Spike Lee</span> &mdash; I'll be in your neighborhood!!`,
          img: "https://picsum.photos/250/300?image=660",
          comments: "",
        },
        {
          avatar: "https://picsum.photos/250/300?image=821",
          title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
          subtitle:
            '<span class="font-weight-bold">to Operations support</span> &mdash; Wish I could come.',
          img: "",
          comments: "",
        },
        {
          avatar: "https://picsum.photos/250/300?image=783",
          title: "Yes yes",
          subtitle:
            '<span class="font-weight-bold">Bella</span> &mdash; Do you have Paris recommendations',
          img: "",
          comments: "",
        },
        {
          avatar: "https://picsum.photos/250/300?image=1006",
          title: "Dinner tonight?",
          subtitle:
            '<span class="font-weight-bold">LaToya</span> &mdash; Do you want to hang out?',
          img: "",
          comments: "",
        },
        {
          avatar: "https://picsum.photos/250/300?image=146",
          title: "So long",
          subtitle:
            '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
          img: "https://picsum.photos/250/300?image=146",
          comments: "wow la galère ce Tchat en vue.js",
          avatarcomment: "https://picsum.photos/250/300?image=821",
          pseudocomment: "Summer BBQ",
        },
      ],
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      showHideThumbUp: true,
      deleteAccepted: false,
    };
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
    //refresh post when add new one notifyParent()
    refreshPost(){
      this.$emit("refresh");
    },
    //fonctionnalitées à finir
   /* deletePost(){
      const message_id = this.postData.message_id;
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
      const message_id = this.postData.message_id;
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
      const message_id = this.postData.message_id;
      const commentData = {
        message_id: this.postData.message_id,
        message_content: this.message_content,
        user_id: localStorage.getItem('userID'),
      };
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
      axios.post("http://localhost:3000/api/comment/create/"+ message_id, commentData)
      .then(()=>{
        this.comment_content ='';
        this.getComments();
      });
    },
    mounted(){
      this.getComments();
    },*/
  },
};
</script>