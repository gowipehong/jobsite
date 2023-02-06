<script>
	import '../../../app.css';
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { getUserId } from '../../../utils/auth';

	async function postNewJob(e) {
		e.preventDefault();

		const newJobData = {
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

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newJobData)
		});
		const res = await resp.json();
		if (resp.status == 200) {
			goto(`/jobs/${res.id}`);
		}
	}
</script>

<div class="flex flex-col p-5">
	<form on:submit={postNewJob}>
		<div class="form-control mb-5">
			<label class="mb-1" for="job">
				<span>Job Title</span>
			</label>
			<input
				class="input input-bordered full"
				type="text"
				id="job"
				name="job-title"
				placeholder="E-Sport Player"
				required
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
				placeholder="10000"
				required
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
				placeholder="200000"
				required
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
				placeholder="e.g. Sentinel"
				required
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
				placeholder="e.g. US"
				required
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
				placeholder=""
				required
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
				placeholder=""
				required
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
				placeholder=""
				required
			/>
		</div>

		<div class="form-control w-full mt-8">
			<button class="btn btn-md normal-case">Post!</button>
		</div>
	</form>
</div>