import moment from 'moment';
export const PI = 3.14;
export const lists = [
    {
        id:1,
        name:"Macbook"
    },
    {
        id:2,
        name:"MSI"
    },
    {
        id:3,
        name:"Acer"
    },
]

export const Config = {
    image_path : "http://localhost:8080/project/image_ecm_g3/"
}


export const formatDateClient = (date, pattern="DD/MM/YYYY") => {
    return moment(date).format(pattern)
}

export const formatDateServer = (date,pattern= "YYYY-MM-DD" ) => {
    return moment(date).format(pattern)
}

export const getCurrentUser = () => {
    var profile = localStorage.getItem("profile")
    if(profile != "" && profile != null){
        profile = JSON.parse(profile)
        return profile

    }
    return null;
}

export const getUserId = () => {
    const profile = getCurrentUser();
    if(profile){
        return profile.employee_id
    }
    return null;
}

export const isLogin = () => {
    const isUserLogin = localStorage.getItem("isLogin");
    if(isUserLogin == null ||isUserLogin == "null" || isUserLogin == "" || isUserLogin == 0){
        return false;
    }
    return true;
}