export function saveItem(key, value) {
  window.localStorage.setItem(key, value)
}

export function removeItem(key) {
  window.localStorage.removeItem(key)
}

export function clearLocalstorage() {
  window.localStorage.clear()
}
