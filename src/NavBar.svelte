<script lang="ts">
  import { Link } from 'svelte-routing';
  import { user } from './lib/stores/user';
  import { logout } from './lib/plugins/firebase/firebase-auth';

  let toggleIsOpen = false;

  const toggle = () => {
    toggleIsOpen = !toggleIsOpen;
  };
</script>

<nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <Link
            to="/"
            class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium tracking-wide"
            >🧠 Trivia</Link
          >
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <Link
              to="/"
              class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >Lobbies</Link
            >
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <div class="ml-4 flex items-center md:ml-6">
          <div class="relative ml-3">
            <div hidden={$user === null}>
              <button
                type="button"
                on:click={toggle}
                class="flex max-w-xs gap-2 items-center rounded-full bg-gray-800 text-sm focus:outline-none"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  src={$user?.photoURL}
                  alt={`${$user?.displayName}'s photo'`}
                />
                <p class="text-gray-300">
                  {$user?.displayName}
                </p>
              </button>
            </div>

            <div
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              hidden={$user === null || !toggleIsOpen}
              tabindex="-1"
            >
              <button
                on:click={logout}
                role="menuitem"
                tabindex="-1"
                class="block px-4 py-2 text-sm text-gray-700"
                id="user-menu-item-2"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="-mr-2 flex md:hidden">
        <!-- Mobile menu button -->
        <button
          type="button"
          on:click={toggle}
          class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <!-- Menu open: "hidden", Menu closed: "block" -->
          <svg
            class="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <!-- Menu open: "block", Menu closed: "hidden" -->
          <svg
            class="hidden h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div class="md:hidden" id="mobile-menu" hidden={!toggleIsOpen}>
    <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
      <Link
        to="/"
        class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >Lobbies</Link
      >
    </div>
    <div class="border-t border-gray-700 pb-3 pt-4" hidden={$user === null}>
      <div class="flex items-center px-5">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" src={$user?.photoURL} alt="" />
        </div>
        <div class="ml-3">
          <div class="text-base font-medium leading-none text-white">
            {$user?.displayName}
          </div>
          <div class="text-sm font-medium leading-none text-gray-400">
            {$user?.email}
          </div>
        </div>
      </div>
      <div class="mt-3 space-y-1 px-2">
        <button
          on:click={logout}
          role="menuitem"
          tabindex="-1"
          class="block px-4 py-2 text-sm text-gray-300"
          id="user-menu-item-2"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
</nav>
