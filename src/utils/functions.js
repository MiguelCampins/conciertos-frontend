export const isValidEmail = (email) => {
     const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
     return regex.test(email);
} 

export const isValidPhone = (phone) => {
    const regex = new RegExp(/^\d{9}$/);
    return regex.test(phone);
}

export const isValidstring = (string) => {
    const regex = new RegExp(/^[a-zA-Z]+(([',. -ñ][a-zA-Z ])?[a-zA-Z]*)*$/);
    return regex.test(string);
}

export const isValidNumber = (num) => {
    const regex = new RegExp(/^[0-9]*$/);
    return regex.test(num);
}