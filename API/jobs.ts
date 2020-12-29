import { get } from "./api";

const URL = "https://torre.co/";

export async function jobViewAPI(term) {
      const response = await get(`${URL}api/opportunities/${term}`, {});
      return response.data;
}
