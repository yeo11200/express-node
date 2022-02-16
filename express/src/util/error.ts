import { messageState } from "../middleware/locals"

export const ERROR_CODE: { [key : string] : number} = {
  BAD_REQUEST : 500,
  ACCESSTOKENEXPIRED: 401,
  ACCESSTOKENINVALID: 419,
  REFRESHTOKENEXPIRED: 402,
  REFRESHTOKENINVALID: 420,
}

export const ERROR_MSG: { [key : string] : string} = {
  BAD_REQUEST : messageState('common.request.msg01'),
  ACCESSTOKENEXPIRED: messageState('common.request.msg02'),
  ACCESSTOKENINVALID: messageState('common.request.msg03'),
  REFRESHTOKENEXPIRED: messageState('common.request.msg04'),
  REFRESHTOKENINVALID: messageState('common.request.msg05'),
}