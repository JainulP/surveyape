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

export const verifyUser = (code, emailId) =>
    fetch(`${api}/activate/`+emailId +`?vCode=`+code, {
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


export const createSurvey = (payload) =>
    fetch(`${api}/survey?surveyName=`+payload.surveyName+`&endTime=`+payload.endTime+
            `&userId=`+localStorage.getItem("userId")+`&surveyType=`+payload.surveyType, {
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

export const publishSurvey = (payload) =>
    fetch(`${api}/survey/`+payload+`?published=true`, {
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


export const getAll02Surveys = () =>
    fetch(`${api}/survey/`, {
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

export const addParticipants = (payload) =>
    fetch(`${api}/participants/`+payload.surveyId+`?emails=`+payload.participants, {
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

export const createQuestion = (payload) =>
    fetch(`${api}/question?questionStr=`+payload.questionStr+`&answerType=`+payload.answerType+`&choiceType=`+payload.choiceType+`&questionType=`+payload.questionType+
        `&options=`+payload.options+`&surveyId=`+payload.surveyId +`&visual=` +payload.visualStyle, {
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

export const updateQuestion = (payload) =>
    fetch(`${api}/question?questionId=`+payload.questionId+`&questionStr=`+payload.questionStr+`&answerType=`+payload.answerType+`&choiceType=`+payload.choiceType+`&questionType=`+payload.questionType+
        `&options=`+payload.options+`&surveyId=`+payload.surveyId+`&visual=` +payload.visualStyle, {
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

/* survey stats */
export const getListOfSurveyscreated = (payload) =>
    fetch(`${api}/survey/created/`+payload, {
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

export const surveyStats = (payload) =>
    fetch(`${api}/survey/surveystats/`+payload, {
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

export const surveysGiven = (payload) =>
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