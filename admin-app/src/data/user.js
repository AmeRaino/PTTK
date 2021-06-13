export default function() {
  var token = sessionStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  }
}
