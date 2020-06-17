import { ENTER_ACCOUNT_INFO, CHANGE_SEARCHED_ACCOUNT } from './constants'


export const enterAccountInfo = (acctInfo) => ({
  type: ENTER_ACCOUNT_INFO,
  payload: acctInfo
})

export const changeSearchedAccount = (acct) => ({
  type: CHANGE_SEARCHED_ACCOUNT,
  payload: acct
})