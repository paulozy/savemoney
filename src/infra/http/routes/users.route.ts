import express, { Request, Response } from 'express'
import { makeCreateUserController } from '../factories/create-user-controller.factory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/ensure-authenticated-middleware.factory'

const usersRouter = express.Router()

const createUserController = makeCreateUserController()
const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()


usersRouter.post('/', async (req: Request, res: Response) => {
  const requestData = {
    ...req.body,
    ...req.params,
    ...req.query,
    // userId: req.userId,
  }

  const httpResponse = await createUserController.handle(requestData)

  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  } else {
    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.error,
    })
  }
})

usersRouter.use(ensureAuthenticatedMiddleware.handle)

usersRouter.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello World' })
})

export { usersRouter }
