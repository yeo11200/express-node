/**
 * 에러코드를 관리하는 곳
 * @param code { number }
 * @param message { string }
 * @returns 
 */
export const fail = (_code: number, _message: string) => {
  return {
    status: _code,
    message: _message
  }
}