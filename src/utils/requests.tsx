import { BASE_URL } from "./API";

interface CustomRequest extends Request {
  headers: Request['headers'] & {authorization: string}
}


export const checkResponse = (res : Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async (url: string, options: RequestInit) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};


export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse as () => Promise<{
    success: string;
    refreshToken: string;
    accessToken: string;
  }>);
};

export const fetchWithRefresh = async (url: string, options: CustomRequest) => {
  
  
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err ) {
    const error = err as Error
    if (error.message === "jwt expired") {
      const refreshData = await refreshToken(); 
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      console.log(options.headers.authorization )
      const res = await fetch(url, options); 
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

