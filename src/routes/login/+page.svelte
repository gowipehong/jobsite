<script>
	import '../../app.css'
	import { goto } from '$app/navigation'
	import { authenticateUser } from '../../utils/auth.js'

	async function letUserLogIn() {
		goto('/jobs/new')
	}

	async function checkUser(e) {
		e.preventDefault()

		const userInfo = {
			identity: e.target['username'].value,
			password: e.target['password'].value
		};

		const ress = await authenticateUser(userInfo.identity, userInfo.password)
		if (ress.success) {
			letUserLogIn()
		}  
}
</script>

{#if $errorStatus}
<div class="alert alert-error shadow-lg">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Wrong username/password! </span>
  </div>
</div>
{/if}

<div class="flex flex-col justify-center items-center text-xl m-10">
	<div>Welcome to log in page</div>
	<form method="post" on:submit={checkUser} class="md:w-1/3 m-10">
		<div class="form-control w-full ">
			<label class="text-center pb-2 text-lg md:label" for="username">
				<span class="label-text">Username</span>
			</label>
			<input
				class="input input-bordered w-full"
				type="text"
				id="username"
				name="username"
				placeholder=""
				required
			/>
		</div>

		<div class="form-control">
			<label class="text-center pb-2 text-lg mt-3 md:label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				class="input input-bordered w-full"
				type="password"
				id="min"
				name="password"
				placeholder=""
				required
			/>
		</div>

		<div class="form-control w-full mt-4">
			<button class="btn btn-md mt-4">
				Log In
			</button>
		</div>
	</form>
</div>