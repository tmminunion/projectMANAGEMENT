export const postData = async data => {
  try {
    const response = await fetch(`/api/db/job/update_date`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer <your-access-token>',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Error during POST request:', error)

    return null
  }
}

export const getDataById = async id => {
  try {
    const response = await fetch(`${API_URL}/data/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer <your-access-token>',
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Error during GET request:', error)

    return null
  }
}
