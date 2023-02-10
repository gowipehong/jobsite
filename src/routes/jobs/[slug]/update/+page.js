import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
import { redirect } from '@sveltejs/kit'
import { validToken, getUserId } from "../../../../utils/auth.js"

export async function load({ fetch, params }) {
  if (!(await validToken())) {
    throw redirect(301, '/users/new')
  }

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`)

  const res = await resp.json()
  if (resp.status == 200) {
    if (res.user != getUserId()) {
      throw redirect(301, '/')
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