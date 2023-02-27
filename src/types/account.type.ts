export interface ACCOUNT_LIST {
    accountId : number
    username: string;
    accountType: string
    about: string
    amount: number
    updateDate: string
    isPayment: string
    amountPaid: number
    visa:string
  }
  
  export interface CREATE_ACCOUNT {
    accountType: string
    about: string
    amount: number
    userId: number
  }

  
  export interface UPDATE_PAYMENT {
    visa: string
    amountPaid: number

  }

  export interface HISTORY_PAYMENT {
    paymentId: number
    accountType: string
    amount: number
    updateDate: string
    isPayment: string
    username: string
    visa: string
    amountPaid: number

  }
  
  