import { EventEmitter } from 'events'


interface ScheduledTask extends EventEmitter {
  now: (now?: Date) => void
  start: () => void
  stop: () => void
  pid: () => string | void
  isRunning: () => boolean
}

/**
 * Creates a new task to execute the given function when the cron expression ticks.
 * @param cronExpression
 * @param func 
 * @param options 
 */
export declare function schedule(
  cronExpression: string,
  func: ((now: Date | 'manual' | 'init') => void) | string,
  options?: ScheduleOptions
): ScheduledTask

/**
 * To validate the expression is cron expression or not 
 * @param cronExpression
 */ 
export declare function validate(cronExpression: string): boolean

/**
 * Get the list of tasks created using `schedule` function
 */
export declare function getTasks(): Map<string, ScheduledTask>

interface ScheduleOptions {
  /**
   * A boolean to set if the created task is scheduled
   *
   * Default to `true`
   */
  scheduled?: boolean
  /**
   * Specifies whether to recover missed executions instead of skipping them
   *
   * Default to `false`
   */
  recoverMissedExecutions?: boolean
  /**
   * Timezone that is used for scheduling
   */
  timeZone?: string
  /**
   * Executes task immediately after creation
   */
  runOnInit?: boolean
  /**
   * Schedule name
   */
  name?: string
}