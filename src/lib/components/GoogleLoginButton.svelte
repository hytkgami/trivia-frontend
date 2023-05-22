<script lang="ts">
  import googleIcon from '../../assets/btn_google_light_normal_ios.svg';
  import { googleSignin } from '../plugins/firebase/firebase-auth';
</script>

<button
  on:click={googleSignin}
  class="rounded-full flex items-center gap-1 border-2 dark:border-cyan-800 bg-white dark:bg-[#4285F4] hover:bg-gray-100 dark:hover:bg-blue-700 text-gray-600 dark:text-gray-200"
>
  <img src={googleIcon} alt="Google" class="w-8 h-8 inline" />
  <span class="pr-3">Sign in with Google</span></button
>
