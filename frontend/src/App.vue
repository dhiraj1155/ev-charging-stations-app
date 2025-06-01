<template>
  <div class="min-h-screen bg-gray-100">
    <nav v-if="$route.path !== '/'" class="bg-blue-500 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white text-lg font-bold">EV Charging App</div>
        <div class="space-x-4">
          <router-link to="/chargers" class="text-white hover:underline">Charger List</router-link>
          <router-link to="/map" class="text-white hover:underline">Map View</router-link>
          <button
            @click="logout"
            class="text-white hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>