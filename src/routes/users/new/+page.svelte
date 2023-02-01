<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  let formErrors = {};

  async function postSignUp() {
    console.log("to be implemented")
  }

  async function createUser(evt) {
    evt.preventDefault()
    if (evt.target['password'].value != evt.target['password-confirmation'].value) {
      formErrors['password'] = { message: 'Password not matching' };
      return
    }

    const userData = {
      username: evt.target['username'].value,
      email: evt.target['email'].value,
      password: evt.target['password'].value,
      passwordConfirm: evt.target['password-confirmation'].value
    };

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (resp.status == 200) {
      postSignUp();
    } else {
      const res = await resp.json();
      formErrors = res.data;
    }
  }
</script>

<div class="flex justify-between m-3">
    <button class="btn btn-outline btn-info w-30 normal-case">NEXT Jobs DB</button>
    <div>
        <a class="btn btn-outline btn-info mr-3 normal-case" href="/users/new">Post a Job</a>
        <button class="btn btn-outline btn-info normal-case">Log In</button>
    </div>
</div>

<h1 class="text-center text-xl mt-10">Create an Account to Post a Job</h1>
<div class="text-center">
    <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
</div>
<div class="flex justify-center items-center mt-8">
    <form on:submit={createUser} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="username">
                <span class="label-text">Username</span>
            </label>
            <input
                type="text"
                name="username"
                placeholder="MrAdios"
                class="input input-bordered w-full"
            />
            {#if 'username' in formErrors}
                <label class="label" for="username">
                    <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input
                type="email"
                name="email"
                placeholder="adios@example.com"
                class="input input-bordered w-full"
                required
            />
            {#if 'email' in formErrors}
                <label class="label" for="email">
                    <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Password</span>
            </label>
            <input
                type="password"
                name="password"
                placeholder=""
                class="input input-bordered w-full"
                required
            />
            {#if 'password' in formErrors}
                <label class="label" for="password">
                    <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Confirm Password</span>
            </label>
            <input
                type="password"
                name="password-confirmation"
                placeholder=""
                class="input input-bordered w-full"
                required
            />
            {#if 'password' in formErrors}
                <label class="label" for="password">
                    <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Create an Account</button>
        </div>
    </form>
</div>