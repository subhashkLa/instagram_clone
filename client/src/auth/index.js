export const SignIn = User => {
    return fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(User)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const authenciate = (jwt, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
}