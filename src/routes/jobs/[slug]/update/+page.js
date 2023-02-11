import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
import { redirect } from '@sveltejs/kit'
import { getUserId } from "../../../../utils/auth.js"

export async function load({ fetch, params }) {

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`)

  const res = await resp.json()
  if (resp.status == 200) {
    if (res.user != getUserId()) {
      throw redirect(302, `/jobs/${params.slug}`)
    }

    return {
      job: res
    }
  } else {
    return {
      jobs: []
    }
  }
}