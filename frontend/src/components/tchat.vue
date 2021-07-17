<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-toolbar color="#D1515A" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Messages</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-textarea
          background-color="grey lighten-2"
          color="#D1515A"
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
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        <v-btn
          depressed
          color="#122441"
          class="white--text"
          absolute
          style="margin-top: -40px; margin-left: 75%"
          >Send</v-btn
        >

        <v-list two-line>
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
                <v-text-field
                  label="Comments"
                  
                  hide-details="auto"
                ></v-text-field>
              </v-list-item-content>

              <v-btn icon color="#D1515A" @click="showHideThumbUp = false ,disabledThump()"
                ><v-icon id="like-btn" v-show="showHideThumbUp">mdi-thumb-up</v-icon></v-btn
              >
               <v-btn  v-if="deleteAccepted" icon color="#D1515A"><v-icon>mdi-cancel</v-icon></v-btn> <!--il va falloir gerer le cas où l'utilisateur est un admin ou l'auteur du message -->
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [// ici ce sera l'affichage des objets de la requete comme message_title, message_content mais aussi user_image et comment_content
        {
          header: "Posted",
        },
        { divider: true },
        {
          avatar: "https://picsum.photos/250/300?image=660",
          title: "Meeting @ Noon",
          subtitle: `<span class="font-weight-bold">Spike Lee</span> &mdash; I'll be in your neighborhood!!`,
        },
        {
          avatar: "https://picsum.photos/250/300?image=821",
          title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
          subtitle:
            '<span class="font-weight-bold">to Operations support</span> &mdash; Wish I could come.',
        },
        {
          avatar: "https://picsum.photos/250/300?image=783",
          title: "Yes yes",
          subtitle:
            '<span class="font-weight-bold">Bella</span> &mdash; Do you have Paris recommendations',
        },
        {
          avatar: "https://picsum.photos/250/300?image=1006",
          title: "Dinner tonight?",
          subtitle:
            '<span class="font-weight-bold">LaToya</span> &mdash; Do you want to hang out?',
        },
        {
          avatar: "https://picsum.photos/250/300?image=146",
          title: "So long",
          subtitle:
            '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        },
      ],
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      showHideThumbUp: true,
    };
    
  },
  methods: {
    chooseFiles() {
      document.getElementById("fileUpload").click();
    },
    disabledThump() {
      console.log("ici je dois désactiver le btn like");
    },
  },
};
</script>