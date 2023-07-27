const server = 'http://localhost:8080';

async function getUserProfile() {
    try {
        // const id = 
        const url = `http://localhost:8080/user/profile/1`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const res = await response.json();

        console.log('res: ', res);

        if (res.success) {
            return res;
        } else {
            return { success: false };
        }
    } catch(err) {
        console.log(err);
    }
}

export {
    getUserProfile
}