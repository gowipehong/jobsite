<script>
  import "../app.css"
  import {goto} from '$app/navigation'
  import {isLoggedOn, logOut} from '../utils/auth.js'

  async function loggedOut(){
    let logOutStatus = logOut()

    if(logOutStatus){
      goto('/login')
    }
  }

</script>

<div class="flex justify-between m-3">
    <a class="btn btn-outline btn-info w-30 normal-case" href="/">NEXT Jobs DB</a>
    <div>
      <a class="btn btn-outline btn-info mr-3 normal-case" href="/users/new">Post a Job</a>
      {#if $isLoggedOn}
        <button class="btn btn-outline btn-info normal-case" on:click={loggedOut}>Log Out</button>
      {:else}
        <a class="btn btn-outline btn-info normal-case" href="/login">Log In</a>
      {/if}
      </div>
</div>

<slot/>