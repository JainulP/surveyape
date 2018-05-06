export const GET_HOTELS = 'GET_HOTELS';

export function GetHotels(obj) {
    console.log("Get Hotels Loaded");
    return {
        type : "GET_HOTELS",
        obj                                // this is same as newItem : newItem in ES6
    }
}
