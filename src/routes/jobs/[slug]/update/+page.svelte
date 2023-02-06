<script>
	import '../../../../app.css';
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { getUserId, getTokenFromLocalStorage } from '../../../../utils/auth';
	export let data;

	async function updateJob(e) {
		e.preventDefault();

		const updatedData = {
			user: getUserId(),
			title: e.target['job-title'].value,
			minAnnualCompensation: e.target['min-annual'].value,
			maxAnnualCompensation: e.target['max-annual'].value,
			description: e.target['description'].value,
			requirements: e.target['requirements'].value,
			applicationInstructions: e.target['applicationInstructions'].value,
			location: e.target['location'].value,
			employer: e.target['company'].value
		};

		const resp = await fetch(
			PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`,
			{
				method: 'PATCH',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': getTokenFromLocalStorage()
				},
				body: JSON.stringify(updatedData)
			}
		);
		const res = await resp.json();
		if (resp.status == 200) {
			goto(`/jobs/${res.id}`);
		}
	}
</script>

<div class="flex flex-col p-5">
	<form on:submit={updateJob}>
		<div class="form-control mb-5">
			<label class="mb-1" for="job">
				<span>Job Title</span>
			</label>
			<input
				class="input input-bordered full"
				type="text"
				id="job"
				name="job-title"
				bind:value={data.job.title}
			/>
		</div>

		<div class="form-control mb-5">
			<label class="mb-1" for="min">
				<span>Min. Annual Compensation</span>
			</label>
			<input
				class="input input-bordered full"
				type="number"
				id="min"
				name="min-annual"
				bind:value={data.job.minAnnualCompensation}
			/>
			<div class="text-xs mt-1">USD</div>
		</div>

		<div class="form-control mb-5">
			<label class="mb-1" for="max">
				<span>Max. Annual Compensation</span>
			</label>
			<input
				class="input input-bordered full"
				type="number"
				id="max"
				name="max-annual"
				bind:value={data.job.maxAnnualCompensation}
			/>
			<div class="text-xs mt-1">USD</div>
		</div>

		<div class="form-control mb-5">
			<label class="mb-1" for="company">
				<span>Company Name</span>
			</label>
			<input
				class="input input-bordered full"
				type="text"
				id="company"
				name="company"
				bind:value={data.job.employer}
			/>
		</div>

		<div class="form-control mb-5">
			<label class="mb-1" for="location">
				<span>Job Location</span>
			</label>
			<input
				class="input input-bordered full"
				type="text"
				id="location"
				name="location"
				bind:value={data.job.location}
			/>
		</div>

		<div class="form-control mb-5">
			<label class="mb-1" for="description">
				<span>Description</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-64"
				id="description"
				name="description"
				bind:value={data.job.description}
			/>
		</div>

		<div class="form-control mb-5">
			<label class="mb-1" for="requirements">
				<span>Requirement</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-64"
				id="requirements"
				name="requirements"
				bind:value={data.job.requirements}
			/>
		</div>

		<div class="form-control mb-5">
			<label class="mb-1" for="applicationInstructions">
				<span>Application Instructions</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-24"
				id="applicationInstructions"
				name="applicationInstructions"
				bind:value={data.job.applicationInstructions}
			/>
		</div>

		<div class="form-control w-full mt-8">
			<button class="btn btn-md normal-case">Update!</button>
		</div>
	</form>
</div>