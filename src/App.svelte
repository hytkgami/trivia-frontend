<script lang="ts">
  import { onAuthStateChanged } from 'firebase/auth';
  import { onMount } from 'svelte';
  import { Route, Router } from 'svelte-routing';
  import { auth } from './lib/plugins/firebase/firebase';
  import { user } from './lib/stores/user';
  import NavBar from './NavBar.svelte';
  import TopPage from './TopPage.svelte';

  const authSubscriber = () => {
    onAuthStateChanged(auth, async (userAuthData) => {
      if (userAuthData) {
        user.set(userAuthData);
      } else {
        user.set(null);
      }
    });
  };

  onMount(async () => {
    authSubscriber();
  });
</script>

<Router>
  <div class="h-full flex flex-col">
    <header>
      <NavBar />
    </header>
    <main class="h-full flex flex-col">
      <Route path="/">
        <TopPage />
      </Route>
    </main>
    <footer
      class="bg-white shadow dark:bg-gray-800 border-t-2 dark:border-gray-600"
    >
      <div class="w-full mx-auto max-w-screen-xl py-8 px-4 flex justify-center">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2023 Trivia developers. All Rights Reserved.
        </span>
      </div>
    </footer>
  </div>
</Router>
