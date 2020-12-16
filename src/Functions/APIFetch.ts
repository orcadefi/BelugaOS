export const randomUser = async () => {
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

export const usersRegister = async (email: string, token: string) => {
    const response = await fetch(
        "http://orcadefi.com:1323/users/register",
        {
            method: "get",
            body: JSON.stringify({email: email}),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            }
        }

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

export const usersUpdate = async (username: string, firstName: string, token: string) => {
    const response = await fetch(
        "http://orcadefi.com:1323/users/register",
        {
            method: "get",
            body: JSON.stringify({username: username, firstName: firstName}),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            }
        }

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

export const usersMe = async (token: string) => {
    const response = await fetch(
        "http://orcadefi.com:1323/users/me",
        {
            method: "get",
            headers: {Authorization: "Bearer " + token}
        }

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

