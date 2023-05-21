<div class="h-full flex flex-col">
  <main class="h-full flex flex-col">
    <slot name="main" />
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
