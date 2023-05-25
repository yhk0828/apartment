import { atom } from 'recoil';

// 검색창의 내용
export const keywordState = atom({
  key: 'keywordState',
  default: '',
});
export interface Apartment {
  거래일자?: string,
  건축년도?: string,
  년: string,
  법정동: string,
  아파트: string,
  월: string,
  일: string,
  전용면적: number,
  지번: string,
  지역코드: number,
  층: string,
  아파트ID: string,
  일련번호: string,
  전세금액: string,
  보증금액: string,
  거래금액: string,
  도로명: string,
  해제사유발생일: string,
  해제여부: string,
  중개사소재지: string,
  도로명건물본번호코드: string,
}
export interface Favorite {
id: string;
title: string;
}
export const dataState = atom<Apartment[]>({
  key: "dataState",
  default: [],
});

// 지역을 나누는 api의 페이지의 위치
export const pageState = atom({
    key: 'pageState',
    default: 18,
});
export const 숫자State = atom({
    key: '숫자State',
    default: 1,
});
// Location 자체를 가져오는 state
export const LocationState = atom<Apartment[]>({
  key: 'LocationState',
  default: [],
});

// 로딩을 완료하는 state
export const isLoadingState = atom({
    key: 'isLoadingState',
    default: false,
});


export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: false,
});
// 로그인 창을 띄우기 전 == false
// 로그인 창을 띄우기 위해 클릭 == true
// 로그인 창에서 로그인을 했다 == true
// 로그아웃 == false
export const isLoggedInState2 = atom({
    key: 'isLoggedInState2',
    default: false,
});

export const ClickedState = atom({
    key: "ClickedState",
    default: 1,
});
export const NumberState = atom({
    key: "NumberState",
    default: 0,
});
export const NumberState2 = atom({
  key: "NumberState2",
  default: 12,
});
export const emailState = atom({
    key: "emailState",
    default: "",
});
export const passwordState = atom({
    key: "passwordState",
    default: "",
});
export const NumberState3 = atom({
    key: "NumberState3",
    default: 1,
});

export const IindexState = atom({
    key: "IindexState",
    default: 0,
});
export const InfoState = atom<Apartment[]>({
  key: 'InfoState',
  default: [],
});
export const favlocationState = atom({
  key: 'favlocationState',
  default: "",
});
export function formatPrice(price:number) {
    const billion = Math.floor(price / 10);
    const million = Math.floor((price % 10));
    if(million === 0){
      return `${billion}억`;
    }else if (billion === 0){
      return `${million}천`;
    }else {
      return `${billion}억 ${million}천`;
    }
}
export function formatPrice2(price:number) {
    const billion = Math.floor(price / 10000);
    const million = Math.floor((price % 10000));
    if(million === 0){
      return `${billion}억`;
    }else if (billion === 0){
      return `${million}만원`;
    }else {
      return `${billion}억 ${million}만원`;
    }
}
export function zero (price:number) {
    if(price < 10){
      return `0${price}`;
    }else{
      return price;
    }
}

