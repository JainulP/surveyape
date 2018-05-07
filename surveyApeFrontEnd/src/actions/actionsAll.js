export const SAVE_BASIC_SUREVY = 'SAVE_BASIC_SUREVY';

export function SaveBasicSurvey(obj) {
    console.log("Save Basic Survey");
    return {
        type : "SAVE_BASIC_SUREVY",
        obj                                // this is same as newItem : newItem in ES6
    }
}
