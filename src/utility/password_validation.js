const passwordValidation = (password) => {
    return (password.length < 8 || password.length > 20);
};

export default passwordValidation;
