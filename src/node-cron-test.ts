import cron from './node-cron'

const job = cron.schedule('* * * * *', 'test', { recoverMissedExecutions: true})

job.start()

const tasks = cron.getTasks()

const isValidSyntac = cron.validate('* * * * *') // true