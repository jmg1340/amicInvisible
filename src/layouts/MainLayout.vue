<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Amic Invisible
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          MENU
        </q-item-label>

        <MenuItem
          v-for="opcio in opcionsMenu"
          :key="opcio.title"
          v-bind="opcio"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import MenuItem from 'src/components/Menu_Item.vue'

const opcions_menu = [
  {
    title: 'Grups',
    caption: 'grups de participants',
    icon: 'groups',
    to: '/'
  },
  // {
  //   title: 'Configuració',
  //   caption: 'Servidor, port, usuari i pwd',
  //   icon: 'settings',
  //   to: '/configuracio'
  // }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuItem
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      opcionsMenu: opcions_menu,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
