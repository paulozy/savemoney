import { Request, Response } from 'express'

import { Controller } from '@infra/http/controller.interface'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      userId: request.userId,
    }

    const httpResponse = await controller.handle(requestData)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      })
    }
  }
}