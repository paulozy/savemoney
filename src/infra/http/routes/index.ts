import { Router } from 'express'
import { sessionRouter } from './session.route'
import { transactionsRouter } from './transactions.route'
import { usersRouter } from './users.route'

const router = Router()

router.use('/users', usersRouter)
router.use('/session', sessionRouter)
router.use('/transactions', transactionsRouter)

export { router }

// "personId"?: string,
// "categoryId"?: string,
// "isRecurring"?: boolean,
// "recurringTimes"?: number,