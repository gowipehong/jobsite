import { redirect } from '@sveltejs/kit'
import { validToken } from "../../../utils/auth"

export async function load(){
  if(!(await validToken())){
    throw redirect(301, '/users/new')
  }
}