import { ENTER_ACCOUNT_INFO, CHANGE_SEARCHED_ACCOUNT } from './constants'

const INITIAL_STATE = {
  account: {
    acct: "0x3c5ca637008be36e9697F09fdd62367F16a0f573",
    privateKey: ''
  },
  searchedAcct: "0x6C095A05764A23156eFD9D603eaDa144a9B1AF33"
}

export const accountReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ENTER_ACCOUNT_INFO:
      let account = action.payload.acct.length < 40 ? INITIAL_STATE.account : action.payload

      return {
        ...state,
        searchedAcct: account.acct,
        account
      }

    case CHANGE_SEARCHED_ACCOUNT:
      return {
        ...state,
        searchedAcct: action.payload
      }

      default:
        return state
  }
}