export interface IFcMyInformation {
    name: string,
    nick: string,
    email: string,
    phoneNumber: string,
    level: string,
    reviewer: boolean,
    cookie: number,
}

// 나중에 데이터가 정상적으로 돌아오면 삭제 예정
export interface IFcMyRequestHistory {
    title: string,
}

// 나중에 데이터가 정상적으로 돌아오면 삭제 예정
export interface IFcMyActivityHistory {
    title: string,
}

// 나중에 데이터가 정상적으로 돌아오면 삭제 예정
export interface IFcWishList {
    title: string,
}