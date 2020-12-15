export const usersRegister = async () => {
    const response = await fetch(
        "https://randomuser.me/api/"
    );
    const body = await response.json().then(data => {
        if (response.status === 200) {
            return {data: data.results, ok: true};
        } else {
            return {data: {}, ok: false};
        }
    })
    return body;
}

