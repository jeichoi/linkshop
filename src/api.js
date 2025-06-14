export async function getItems() {
  const response = await fetch(
    "https://linkshop-api.vercel.app/16-%EC%B5%9C%EC%9E%AC%EC%9D%B4/linkshops"
  );
  const body = await response.json();
  return body;
}

export async function createReview(shopCreate) {
  const response = await fetch(
    `https://linkshop-api.vercel.app/16-%EC%B5%9C%EC%9E%AC%EC%9D%B4/linkshops`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopCreate),
    }
  );
  if (!response.ok) {
    throw new Error("생성하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file); // 'file'은 백엔드가 기대하는 필드명

  const response = await fetch(
    "https://linkshop-api.vercel.app/images/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("이미지 업로드 실패");
  }

  const result = await response.json();
  return result.url; // 서버가 { url: "https://..." } 형태로 리턴한다고 가정
}
