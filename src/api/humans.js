const url = 'http://localhost:3030/api/humans'
  
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const handleResponse = async function(response) {
  if (response.status >= 200 && response.status <= 299) {
    return await response.json()
  } else {
    console.log(response.status, response.statusText)
    return false
  }
}

const create = async function(data) {
  const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }
  )
  
  return handleResponse(response)
}

const read = async function() {
  const response = await fetch(url, {
    method: 'GET',
    headers
  })

  return handleResponse(response)
}

const readPage = async function(skip, limit) {
  const response = await fetch(`${url}/${skip}/${limit}`, {
    method: 'GET',
    headers
  })

  return handleResponse(response)  
}

const update = async function(id, data) {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers
  })

  return handleResponse(response)
}

const _delete = async function(id) {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers
  })

  return handleResponse(response)
}

const count = async function() {
  const response = await fetch(`${url}/count`, {
    method: 'GET',
    headers
  })

  return handleResponse(response)
}

const generate = async function(count) {
  const response = await fetch(`${url}/random/${count}`, {
    method: 'GET',
    headers
  })

  return handleResponse(response)
}

export default {create, read, update, delete:_delete, count, generate, readPage}