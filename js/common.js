function getUrlValue(key){
  let queryString = window.location.search;
  let searchParams = new URLSearchParams(queryString);
  let result = searchParams.get(key);

  return result;
}