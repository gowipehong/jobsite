import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { authenticateUser } from '../../../myapp/src/utils/auth';

const emptyAuth = {
  'token': '',
  'userid': ''
}

export function logOut(){
  localStorage.setItem('auth', JSON.stringify(emptyAuth))
  return true
}

export async function authenticateUser(username, password){
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password',
  {
    method: 'POST',
    mode: 'cors',
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      identity: username,
      password
    })
  })

  const res = await resp.json()

  if(resp.status == 200){
    localStorage.setItem('auth', JSON.stringify({
      "token": res.token,
      "userId": res.record.id
    }))

    return {
    success: true,
    res: res
    }
  }

  return {
    success: false,
    res: res
  } 
}

export async function getUserId(){
  const getIdFromAuth = localStorage.getItem('auth')
  if(getIdFromAuth){
    return JSON.parse(getIdFromAuth).token
  }
}

export async function getTokenFromLocalStore(){
  const getToken = localStorage.getItem('auth')
    if(getToken){
      return JSON.parse(getToken).token
    }
    return null
}

export async function validToken(){
  if (!getTokenFromLocalStore()){
    return false
  }

  try{
    const resp = await fetch (PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh',
    {
      method: 'POST',
      mode: 'cors',
      headers:{
        'content-type': 'application/json',
        'Authentication': getTokenFromLocalStore()
      },
    })

    const res = await resp.json()
    if(resp.status = 200){

      localStorage.setItem('auth', JSON.stringify({
        'token': res.token,
        'userId': res.record.id
      }))

      return true
    }
    
    return false
  } catch {
    return false
  }
}