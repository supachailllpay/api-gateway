export default {
  fetch (url, init) {
    return window.fetch(url, init)
      .then(response => response.json())
      .then(body => {
        if (!body.ok) throw body
        return body
      })
  },

  move (array, fromIndex, toIndex) {
    let result = array.slice()
    let element = result.splice(fromIndex, 1)[0]
    result.splice(toIndex, 0, element)
    return result
  }
}
