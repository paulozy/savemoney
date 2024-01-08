import express, { Request, Response } from 'express'
import { makeSessionController } from '../factories/session-controller.factory'

const sessionRouter = express.Router()
const { createOtpController, verifyOtpCodeController } = makeSessionController()

sessionRouter.post('/', async (req: Request, res: Response) => {
  const requestData = {
    ...req.body,
    ...req.params,
    ...req.query,
  }

  const httpResponse = await createOtpController.handle(requestData)

  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  } else {
    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.error,
    })
  }
})

sessionRouter.post('/verifyCode', async (req: Request, res: Response) => {
  const requestData = {
    ...req.body,
    ...req.params,
    ...req.query,
  }

  const httpResponse = await verifyOtpCodeController.handle(requestData)

  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  } else {
    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.error,
    })
  }
})

export { sessionRouter }
