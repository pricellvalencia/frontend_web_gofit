<template>
  <q-layout view="hHh lpR fFf">
    
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo.png">
          </q-avatar>
          Gofit - Kasir
        </q-toolbar-title>
        
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
      
      <q-tabs align="left">
          <q-route-tab to="/member" label="Member" />
          <q-route-tab to="/aktivasi" label="Aktivasi Tahunan" />
          <q-route-tab to="/depositUang" label="Deposit Uang" />
          <q-route-tab to="/depositKelas" label="Deposit Kelas" />
          <q-route-tab to="/presensiGym" label="Presensi Gym" />
          <q-route-tab to="/presensiKelas" label="Presensi Kelas" />
      </q-tabs>
    </q-header>
    
    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" elevated>
      <!-- drawer content -->
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="..\assets\user-avatar.png">
            </q-avatar>
          </q-item-section>
          
          <q-item-section>
            <q-item-label lines="1">{{namaPegawai.NAMA_PEGAWAI}}</q-item-label>
          </q-item-section>
        </q-item>
        
        <q-separator />
        
        <q-footer elevated>
          <q-toolbar>
            <q-btn dense flat round icon="logout" label="Logout" class="q-ml-sm" v-on:click="logout" />
          </q-toolbar>
        </q-footer>
      </q-list>
    </q-drawer>
    
    <q-page-container>
      <router-view />
    </q-page-container>
    
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {

  setup () {

    const router = useRouter()
    
    const rightDrawerOpen = ref(false)

    const namaPegawai = JSON.parse(localStorage.getItem('user') || '');

    const logout = () => {
      localStorage.removeItem("user")
      router.push('/');
    }

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      logout,
      namaPegawai
    }
  }
}
</script>