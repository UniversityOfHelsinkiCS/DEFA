# Apollo Error Handling

## Frontend

The error handler will take over when a GraphQL query made through Apollo results in an error. All errors will cause a toast to be displayed. There are 2 mutually exclusive types of errors that the error handler can handle.

### Network Error

A network error is an error response from the backend (4XX, 5XX). The following fileds will be processed if the response has a JSON body.

* `code` Tells the error handler what kind of error occured. The handler can take actions accordingly (User will be logged out when a `TokenError` occurs for example).
* `message` If defined, this text will be displayed instead of the default error message in the error toast.

### GraphQL Error

GraphQL errors are errors raised when handling a successfully received GraphQL query. They are returned in the GraphQL response (200) under the field `errors`. GraphQL errors can have fields defined in an object in their `extensions` field. Specifically

* `code` Same as network error.
* `toastable` Boolean. If true, displays the error message in the error toast instead of the default error message.

## Backend

Backend should return errors in this specific format.

### Network Error

A generic network error like `res.status(400)` will result in the frontend displaying its default network error message.

A specific error message can be provided in a JSON body: `res.status(400).json({ message: 'Error message' })`. The message will replace the default message.

An error can be specified as a certain type with the `code` field: `res.status(400).json({ message: 'Error message', code: 'TokenError' })`. When not supplied, frontend will receive no code.

### GraphQL Error

GaphQL errors should be thrown during the execution of the resolver. Throwing an error will stop the execution of the resolver and returns a GraphQL response with `errors` field populated.

A generic error like `throw new Error('Error message')` will result in the frontend displaying its default GraphQL error message.

A custom error can be thrown to have the frontend error handler take action. Example:

```
class PrivilegeRequiredError extends Error {
  public message = 'You are not allowed to perform this action. Ask an administrator to grant you the privilege.'
  public extensions = {
    toastable: true,
    code: 'PrivilegeRequiredError'
  }
}
```
When thrown during the execution of a resolver will result in the frontend replacing the default error message with the error's message (because toastable is set to true) and frontend will take action appropriate for a `PrivilegeRequiredError` if any.
