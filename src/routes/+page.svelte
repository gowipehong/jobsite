<script>
  import "../app.css"
  import humanize from 'humanize-plus'
  export let data
</script>

<h1 class="text-center text-xl font-bold mb-10">Find Your Next Job</h1>

<div class="overflow-x-auto w-full flex flex-wrap flex-row justify-evenly">
    {#each data.jobs as job}
        <div class="border rounded-xl p-5 m-5 w-1/4">
            <div class="text-lg font-normal">{job.employer}</div>
            <div class="text-lg font-normal">{job.title}</div>
            <br>
            <div class="text-lg font-semibold">{job.location}</div>
            <div class="text-lg font-semibold">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</div>
            <br>
            <div>{job.description.slice(0, 150)}...</div>
            <br>
            <div class="flex justify-end">
                <a class="btn btn-outline btn-accent" href="./jobs/{job.id}">View</a>
            </div>
        </div>
    {/each}
</div>