<template>
<div
  class="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
  :style="{ backgroundImage: `url(${require('@/assets/ev-bg1.jpg')})` }"
>

    <div class="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-800">
          {{ isRegister ? 'Create an Account' : 'Welcome Back' }}
        </h2>
        <p class="text-sm text-gray-500 mt-2">
          {{ isRegister ? 'Join the EV Revolution' : 'Power up your journey' }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-1">Username</label>
          <input
            v-model="form.username"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-lg"
        >
          {{ isRegister ? 'Register' : 'Login' }}
        </button>

        <p class="text-center text-sm text-gray-600 mt-2">
          <button
            type="button"
            @click="isRegister = !isRegister"
            class="text-green-500 hover:text-green-700 font-medium transition-all"
          >
            {{ isRegister ? 'Already have an account? Login' : 'Need an account? Register' }}
          </button>
        </p>

        <p v-if="error" class="text-center text-red-500 text-sm animate-pulse mt-2">
          {{ error }}
        </p>
      </form>
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
