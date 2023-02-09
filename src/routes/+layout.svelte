<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import { isLoggedOn, logOut } from '../utils/auth.js';
	import Theme from './components/Theme.svelte';

	let showMenu = false;

	function toggleNavbar() {
		showMenu = !showMenu;
	}

	async function loggedOut() {
		let logOutStatus = logOut();

		if (logOutStatus) goto('/login');
	}
</script>

<div class="flex justify-between m-3">
	<a class="btn btn-outline btn-info w-25 normal-case" href="/">NEXT Jobs DB</a>
	<div class="md:flex md:flex-row">
		<div class="flex justify-end items-center">
			<Theme />
			<div class="md:hidden">
				<div class="dropdown dropdown-bottom dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<label tabindex="0" class="m-1"
						><button on:click={toggleNavbar} class="btn btn-square btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block w-5 h-5 stroke-current"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/></svg
							>
						</button></label
					>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
						<li><a class="btn btn-outline btn-info normal-case mb-3" href="/users/new">Post a Job</a></li>
						<li>
							{#if $isLoggedOn}
								<button class="btn btn-outline btn-info normal-case" on:click={loggedOut}
									>Log Out</button
								>
							{:else}
								<a class=" btn btn-outline btn-info normal-case right-0" href="/login">Log In</a>
							{/if}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="hidden md:block">
			<a
				class=" btn btn-outline btn-info md:mr-3 normal-case mb-3 md:mb-0 md:ml-5"
				href="/users/new">Post a Job</a
			>
			{#if $isLoggedOn}
				<button class="btn btn-outline btn-info normal-case" on:click={loggedOut}>Log Out</button>
			{:else}
				<a class=" btn btn-outline btn-info normal-case right-0" href="/login">Log In</a>
			{/if}
		</div>
	</div>
</div>
<slot />
