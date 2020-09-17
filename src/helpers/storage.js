export default function (storageName, payload) {
  if (!payload) {
    return JSON.parse(localStorage.getItem(storageName))
  }
  localStorage.setItem(storageName, JSON.stringify(payload))
}