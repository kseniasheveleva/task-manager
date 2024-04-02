export const extractFormData = (form) => {
    const data = new FormData(form);
    const result = {};

    data.forEach((key, value) => {
        result[key] = value
    })

    return result
}