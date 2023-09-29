/**
 * The function `response` returns an object with optional data and message properties, along with a
 * timestamp.
 * @param {unknown} data - The `data` parameter is of type `unknown`, which means it can be any type of
 * data. It is an optional parameter, so it can be omitted if not needed.
 * @param {string} [message] - The `message` parameter is an optional string that represents a custom
 * message to be included in the response object. It is used to provide additional information or
 * context about the response.
 * @returns an object with the following properties:
 * - If a `message` parameter is provided and its length is greater than 0, the returned object will
 * have a `message` property with the value of the `message` parameter. It will also have a `data`
 * property with the value of the `data` parameter if it is truthy, and a `timestamp` property with the
 */
export function response(data: any, message?: string) {
  if (message.length && message.length > 0) {
    return {
      message,
      ...(data ? { data } : {}),
      timestamp: new Date(),
    }
  }
  return { ...(data ? { data } : {}), timestamp: new Date() }
}
