export interface IFcMyInformation {
    name: string,
    email: string,
    nick: string,
    grade: string,
    point: number,
    phoneNumber: string,
    commoents: string[],
    reviews: '',
    lang: string[],
    photo: string,
    reviewer: boolean,
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