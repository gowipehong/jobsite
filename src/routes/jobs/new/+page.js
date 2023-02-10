import { redirect } from '@sveltejs/kit'
import { validToken } from "../../../utils/auth.js"
import { alerts } from "../../../utils/alert.js"

export async function load() {
  if (!(await validToken())) {
    alerts.setAlert('Please Sign Up!', 'alert-warning')
    throw redirect(301, '/users/new')
  }
}