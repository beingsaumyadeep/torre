import { post } from "./api";

const URL = "https://search.torre.co/"

export async function jobSearchAPI(page: number, term: string, size: number) {
      const response = await post(`${URL}opportunities/_search/`, {
            params: {
                  currency: "USD$",
                  page: page,
                  periodicity: "hourly",
                  lang: "en",
                  size: size,
                  aggregate: true,
                  offset: 0
            },
            data: {
                  "skill/role": {
                        text: term,
                        experience: "potential-to-develop"
                  }
            }
      });
      return response.data.results;
}


export async function personSearchAPI(page: number, term: string, size: number) {
      const response = await post(`${URL}people/_search/`, {
            params: {
                  currency: "USD$",
                  page: page,
                  periodicity: "hourly",
                  lang: "en",
                  size: size,
                  aggregate: false,
                  offset: 0
            },
            data: { name: { term: term } }
      });
      return response.data.results;
}

export async function searchBySkill(page: number, term: string, size: number) {
      const response = await post(`${URL}people/_search/`, {
            params: {
                  currency: "USD$",
                  page: page,
                  periodicity: "hourly",
                  lang: "en",
                  size: size,
                  aggregate: false,
                  offset: 0
            },
            data: {"skill/rolor": {text: term } }
      });
      return response.data.results;
}
