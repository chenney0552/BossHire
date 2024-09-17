/*
    user main page
        candidate
        boss
    user info edit page
        candidate
        boss
    decide if the information is completed ? user.header
    check user type ? user.type
*/
export function getRedirectTo(type, header) {
    let path;
    // if user type is boss
    if(type==='boss') {
        path = '/dashen'
    } else {
        path = '/laoban'
    }
    // if user didn't complete the information
    if(!header) {
        path += 'info'
    }
    return path
}