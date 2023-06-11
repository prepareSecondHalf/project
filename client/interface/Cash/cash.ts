export interface IFcChargeCash {
    userid: string,
    amount: number,
    payment: string,
}

export interface IFcChargeCashHistory {
    id: string,
    userid: string,
    amount: number,
    payment: string,
    date: string,
}

export interface IFcUsedCash {
    userid: string,
    amount: number,
}

export interface IFcUsedCashHistory {
    id: string,
    userid: string,
    amount: number,
    date: string,
}