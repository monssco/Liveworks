import {  intervalToDuration, formatDuration, fromUnixTime, format } from 'date-fns'

/**
 * Show custom format of a given time interval.
 * 
 * Usage:
 * customFormatDuration({ start: 0, end: 10800 * 1000}) // 3 hours
 * customFormatDuration({ start: 0, end: 108000 * 1000}) // 1 day 6 hours
 * @start start time in unix
 * @end end time in unix 
 * @returns a human-readable string for the time interval
 */
export const customFormatDuration = ({ start, end }: { start: number, end: number }) => {

    const durations = intervalToDuration({start: fromUnixTime(start), end: fromUnixTime(end)})
    
    return formatDuration(durations)
}


/**
 * Takes a unix timestamp and returns a human-readable string for the time interval to be displayed on the UI.
 * @param unixTime unix time in milliseconds
 * @returns A human-readable string for the time interval
 */
export const toFrontendTime = (unixTime: number) => {
    return format(fromUnixTime(unixTime), 'HH:mm')
}

/**
 * Changes a backend currency value expressed in cents to a human-readable string.
 * @param rate
 */
export const toFrontEndCurrency = (rate: number | null | undefined) => {
    
    if (rate === null || rate === undefined) {
        return ''
    }

    return `${rate / 100}`
}

/**
 * 
 * @param rate a frontend currency value expressed in dollars
 * @returns an integer representing the cents value of the given currency
 */
export const toBackEndCurrenct = (rate: string) => {
    return parseInt(rate) * 100
}