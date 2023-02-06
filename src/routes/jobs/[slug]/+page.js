import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
import { isLoggedOn } from '../../../utils/auth.js'
import { validToken } from '../../../utils/auth.js'

export async function load({ fetch, params }) {

  if(await validToken()){
    isLoggedOn.set(true)
  }

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);

  const res = await resp.json();
  if (resp.status == 200) {
    return {
      job: res
    }
  } else {
    return {
      jobs: []
    }
  }
}