export async function getItems() {
  const response = await fetch(
    "https://linkshop-api.vercel.app/16-%EC%B5%9C%EC%9E%AC%EC%9D%B4/linkshops"
  );
  const body = await response.json();
  return body;
}
