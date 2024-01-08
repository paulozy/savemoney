import { NextFunction, Request, Response } from 'express'
import { decode } from 'jsonwebtoken'
import { fail, forbidden } from '../http-reponse'

type DecodedJwt = {
  sub: string
}

export class EnsureAuthenticatedMiddleware {
  constructor() { }

  async handle(
    request: Request, response: Response, next: NextFunction
  ) {
    try {
      const { authorization: accessToken } = request.headers

      if (accessToken) {
        try {
          const decoded = decode(accessToken.replace('Bearer ', '')) as DecodedJwt

          request.userId = decoded.sub

          return next()
        } catch (err) {
          return response.status(forbidden(err).statusCode).json(forbidden(err).body)
        }
      }

      const unauthorizedError = forbidden(
        new Error('Invalid access token')
      )

      return response.status(unauthorizedError.statusCode).json(unauthorizedError.body)
    } catch (error) {
      return response.status(fail(error).statusCode).json(fail(error).body)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}