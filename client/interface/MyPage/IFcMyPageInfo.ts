export interface IFcMyInformation {
    name: string,
    email: string,
    nickname: string,
    grade: string,
    point: number,
    phone: string,
    comments: any[],
    reviews: any[],
    lang: string[],
    photo: string,
    reputation: number,
    isSubmit: boolean,
}

// Response Interface
export interface IFcMyInfoResponse {
    _id: string,
    name: string,
    email: string,
    nickname: string,
    grade: string,
    point: number,
    phone: string,
    comments: any[],
    reviews: any[],
    lang: string[],
    photo: string,
    reputation: number,
    isSubmit: boolean,
}

// Edit Inferface
export interface IFcMyInfoUpdateRequest {
    userid: string,
    nickname: string,
    phone: string,
    photo: string,
    lang: string[],
}

export interface IfcMyCashChargeRequest {
    userid: string,
    point: number
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