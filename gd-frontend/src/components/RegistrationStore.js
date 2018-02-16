function validatePresence(errors, form, field) {
    if (form[field].trim() !== "") {
        return errors
    }
    return addError(errors, field, `${field} can't be empty`)
}

function validateLength(errors, form, field, min, max) {
    if (form[field].trim().length < min) {
        return addError(errors, field, `${field} must be at least ${min} long.`)
    }
    if (form[field].trim().length > max) {
        return addError(errors, field, `${field} can't be more than ${max} long.`)
    }
    return errors
}

function validateEmail(errors, form, field) {
    const filter = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/
    if (!filter.test(form[field])) {
        return errors
    }
    return addError(errors, field, 'not a valid email')
}

function validateNumeric(errors, form, field) {
    const number = /[0-9]/
    if (!form[field].match(number)) {
        return addError(errors, field, `${field} must contain at least one number`)
    }
    return errors
}

function validatePassword(errors, form, field) {
    errors = validatePresence(errors, form, 'password')
    errors = validateNumeric(errors, form, 'password', 6)
    return errors
}

function addError(errors, field, error) {
    if (errors[field]) {
        errors[field].push(error)
    } else {
        errors[field] = [error]
    }
    return errors
}

module.exports = {
    validatePresence: validatePresence,
    validateLength: validateLength,
    validateEmail: validateEmail,
    validateNumeric: validateNumeric,
    validatePassword: validatePassword,
    addError: addError,
}