import { HttpResponse } from "./http-reponse";


export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}