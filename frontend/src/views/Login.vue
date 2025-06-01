<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">{{ isRegister ? 'Register' : 'Login' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-gray-700">Username</label>
          <input
            v-model="form.username"
            type="text"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {{ isRegister ? 'Register' : 'Login' }}
        </button>
        <p class="mt-4 text-center">
          <a
            href="#"
            class="text-blue-500"
            @click="isRegister = !isRegister"
          >
            {{ isRegister ? 'Already have an account? Login' : 'Need an account? Register' }}
          </a>
        </p>
      </form>
      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isRegister: false,
      form: {
        username: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const action = this.isRegister ? 'register' : 'login';
        await this.$store.dispatch(action, this.form);
        this.$router.push('/chargers');
      } catch (error) {
        this.error = error.message || 'An error occurred';
      }
    },
  },
};
</script>