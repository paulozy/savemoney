import express from 'express'
import { adaptRoute } from '../adapters/express-route.controller'
import { makeCreateTransactionController } from '../factories/create-transaction-controller.factory'
import { makeDeleteTransactionController } from '../factories/delete-transaction-controller.factory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/ensure-authenticated-middleware.factory'
import { makeListTransactionsByUserController } from '../factories/list-transactions-by-user-controller.factory copy'
import { makeShowTransactionController } from '../factories/show-transaction-controller.factory'
import { makeUpdateTransactionController } from '../factories/update-transaction-controller.factory'

const transactionsRouter = express.Router()

const createTransactionController = makeCreateTransactionController()
const deleteTransactionController = makeDeleteTransactionController()
const lisTransactionsByUserController = makeListTransactionsByUserController()
const showTransactionController = makeShowTransactionController()
const updateTransactionController = makeUpdateTransactionController()

const ensureAuthenticatedMiddleware = makeEnsureAuthenticatedMiddleware()

transactionsRouter.use(ensureAuthenticatedMiddleware.handle)

transactionsRouter.post('/', adaptRoute(createTransactionController))
transactionsRouter.delete('/:id', adaptRoute(deleteTransactionController))
transactionsRouter.get('/', adaptRoute(lisTransactionsByUserController))
transactionsRouter.get('/:id', adaptRoute(showTransactionController))
transactionsRouter.put('/:id', adaptRoute(updateTransactionController))

export { transactionsRouter }
