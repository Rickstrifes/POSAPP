const emailValidation = (Email) => {
    const EmailValidRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    return !EmailValidRegExp.test(Email);
};

export default emailValidation;
