const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

export const signup = (payload) =>
    fetch(`${api}/register?username=`+payload.username+`&password=`+payload.password+`&email=`+payload.email+`&age=`+payload.age, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const signout = (payload) =>
    fetch(`${api}/logout`+payload, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {

            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const login = (payload) =>
    fetch(`${api}/login?email=`+payload.email+`&password=`+payload.password, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {
            localStorage.setItem("userid1",res.json());
            debugger;
            localStorage.getItem("userid1");
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const verifyUser = (code, emailId) =>
    fetch(`${api}/users/activate/`+emailId +`?vCode=`+code, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {

        })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const createSurvey = (payload) =>
    fetch(`${api}/survey?surveyName=`+payload.surveyName+`&endTime=`+payload.endTime+`&published=`+payload.published+
            `&userId=`+payload.userId+`&surveyTye=`+payload.surveyTye, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
        //body: JSON.stringify(payload)
    })
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getSurvey = (payload) =>
    fetch(`${api}/survey/`+payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const deleteSurvey = (payload) =>
    fetch(`${api}/survey/`+payload, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const updateSurvey = (payload) =>
    fetch(`${api}/survey/`+payload, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const createQuestion = (payload) =>
    fetch(`${api}/question?questionStr=`+payload.questionStr+`&answerType=`+payload.answerType+`&choiceType=`+payload.choiceType+`&questionType=`+payload.questionType+
            `&options=`+payload.options+`&surveyId=`+payload.surveyId, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getQuestion = (payload) =>
    fetch(`${api}/question/`+payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const deleteQuestion = (payload) =>
    fetch(`${api}/question/`+payload, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'})
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
