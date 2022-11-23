const url = 'http://localhost:3000/api/example'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const create = async function(data) {
  const _response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }
  )
  const response = await _response.text()
  return response
}

const read = async function() {
  const _response = await fetch(url, {
    method: 'GET',
    headers
  })
  const response = await _response.json()
  return response
}

const update = async function(id, data) {
  const _response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers
  })
  const response = await _response.text()
  return response
}

const _delete = async function(id) {
  const _response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers
  })
  const response = await _response.text()
  return response
}

export default {create, read, update, delete:_delete}