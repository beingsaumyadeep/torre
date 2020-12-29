import { get } from "./api";

const URL = "https://bio.torre.co/"

export async function profileViewAPI(term: string) {
      const response = await get(`${URL}api/bios/${term}`, {});
      return response.data;
}
export async function profileStatsAPI(term: string) {
      const response = await get(`${URL}api/bios/${term}/stats`, {});
      return response.data;
}