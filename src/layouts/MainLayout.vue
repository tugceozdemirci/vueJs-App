<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
          <div class="q-mt-md q-ml-md">
          </div>
          <q-list>
              <div class="text-center q-py-md">
                <q-avatar size="80px">
                  <img src="../assets/undraw_female_avatar_efig.svg" >
                  <q-space style="height: 20px;"></q-space>
                  <div class="text-center q-py-md">
                    <p>  {{ currentUser }}  </p>
                  </div>
                </q-avatar>
              </div>
              <q-space style="height: 30px;"></q-space>
              <q-item
              class="my-menu-link"
              to="/home">
              <q-item-section avatar>
                  <q-icon name="home" class="icons"/>
              </q-item-section>
              <q-item-section>
                  <q-item-label>Home</q-item-label>
              </q-item-section>
              </q-item>

              <q-item
              class="my-menu-link"
              to="/products">
              <q-item-section avatar>
                  <q-icon name="local_activity" class="icons"/>
              </q-item-section>
              <q-item-section>
                  <q-item-label>Products</q-item-label>
              </q-item-section>
              </q-item>

              <q-item
              class="my-menu-link" clickable @click="logout" >
              <q-item-section avatar>
                  <q-icon name="logout" class="icons"/>
              </q-item-section>
              <q-item-section>
                  <q-item-label >Logout</q-item-label>
              </q-item-section>
              </q-item>
          <q-space></q-space>
          <div class="q-py-md" style="position: absolute; bottom:0; margin-left:75px">
          </div>
        </q-list>
      </q-drawer>
      <q-page-container>
        <router-view/>
      </q-page-container>
  </q-layout>
</template>

<script>
import { json } from 'body-parser';


export default {
  name: 'MainLayout',
  components: {
  },
  data () {
    return {
      leftDrawerOpen: false,
      currentUser: "",
    }
  },
  mounted() {
    // let currentUser = localStorage.getItem('username');
    let currentUser = JSON.parse(localStorage.getItem("user"));
    currentUser = currentUser.toUpperCase();
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
}
</script>

<style scoped>
.header {
  background-color: #6C63FF;
}
.my-menu-link {
  border-left: 4px solid #6C63FF;
  color: #000;
}
.icons{
  color: #6C63FF;
}
</style>


