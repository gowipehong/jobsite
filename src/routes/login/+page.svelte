<script>
	import '../../app.css'
	import { goto } from '$app/navigation'
	import { authenticateUser } from '../../utils/auth.js'
	let loggingIn = false

	async function letUserLogIn() {
		goto('/jobs/new')
	}

	async function checkUser(e) {
		e.preventDefault()
		loggingIn = true

		const userInfo = {
			identity: e.target['username'].value,
			password: e.target['password'].value
		};

		const ress = await authenticateUser(userInfo.identity, userInfo.password)
		if (ress.success) {
			letUserLogIn()
			loggingIn = false
		}  else {
		loggingIn = false
		errorStatus.set(true)
	}
}
</script>

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