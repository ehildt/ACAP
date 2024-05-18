type FetchParams = [string, RequestInit?];

const headers = {
  "Content-Type": "application/json",
};

export const get = async ([url, init]: FetchParams) =>
  (
    await fetch(url, {
      method: "GET",
      headers,
      ...init,
    })
  )?.json();

export const post = async ([url, init]: FetchParams) =>
  (
    await fetch(url, {
      method: "POST",
      headers,
      ...init,
    })
  )?.json();

export const uPost = async ([url, init]: FetchParams) =>
  (
    await fetch(url, {
      method: "POST",
      ...init,
    })
  )?.json();
