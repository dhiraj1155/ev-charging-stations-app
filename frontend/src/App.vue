<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <!-- Navigation -->
    <header v-if="$route.path !== '/'" class="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-blue-500 shadow-md">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2 text-white font-bold text-xl tracking-wide">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          VoltConnect
        </div>

        <!-- Navigation Links -->
        <nav class="flex gap-4 items-center">
          <router-link
            to="/chargers"
            class="text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Charger List
          </router-link>

          <router-link
            to="/map"
            class="text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Map View
          </router-link>

          <button
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-4">
      <router-view />
    </main>
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

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
