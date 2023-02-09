<script>
	import humanize from 'humanize-plus'
	export let data;
</script>

<h1 class="text-center text-xl font-bold mt-5 mb-3">Find Your Next Job</h1>

<div
	class="overflow-x-auto w-full flex flex-col flex-wrap content-center md:flex-row justify-evenly"
>
	{#each data.jobs as job}
		<div class="flex flex-col space justify-between border rounded-xl p-5 m-5 w-3/4 md:w-1/4">
			<div>
				<div class="text-xlc font-black">{job.employer}</div>
				<div class="text-lg font-normal mb-5">{job.title}</div>
				<div class="text-lg font-semibold">{job.location}</div>
				<div class="text-lg font-semibold mb-5">
					USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(
						job.maxAnnualCompensation
					)}
				</div>
				<div class="mb-5">{job.description.slice(0, 150)}...</div>
			</div>
			<div class="flex justify-end">
				<a class="btn btn-outline btn-accent" href="./jobs/{job.id}">View</a>
			</div>
		</div>
	{/each}
</div>
