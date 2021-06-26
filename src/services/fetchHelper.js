export async function makeGetRequest(url: string): Promise<Response | any> {
  const headers: any = {
    Accept: "application/json, application/xml, text/plain, text/html, *.*",
  };
  headers["content-type"] = "application/json";

  try {
    const response: any = await fetch(url, {
      method: "GET",
      headers,
    });

    if (response.status === 200) {
      const json = await response.json();
      return json;
    } else {
      if (response.status === 500) {
        return Promise.reject({ message: "Internal Server Error!" });
      }
      if (response.status === 400) {
        const json = await response.json();
        const error = json.message ? json.message : "Something Went Wrong!!";
        return Promise.reject({ message: error });
      }
      return response;
    }
  } catch (error) {
    throw error;
  }
}
