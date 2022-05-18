export const createUser = async (user) => {
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/api/v1/users`;
    const data = JSON.stringify(user)
    await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
};
export const createAccount = async (idUser, account) => {
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/api/v1/users/${idUser}/accounts`;
    const data = JSON.stringify(account)
    await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
};
export const getUser = async (id) =>{
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/api/v1/users/${id}`;
    const response = await fetch(url);
    if (response.ok){

        return response.json().then((resp) =>{
            return resp
        })
    }else{
        return "error";
    }
};
export const getAccounts = async (id) =>{
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/api/v1/users/${id}/account`;
    const response = await fetch(url);
    if (response.ok){
        return response.json();
    }else{
        return "error";
    }
};
export const getAccount = async (idAccount) =>{
    //console.log("hola")
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/api/v1/users/account/${idAccount}`;
    const response = await fetch(url);
    ///console.log(url)
    if (response.ok){
        return response.json();
    }else{
        return "error";
    }
};
export const getUserExists = async (idUser) =>{
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/api/v1/users/${idUser}/exists`;
    const response = await fetch(url);
    //console.log(url)
    if (response.ok){
        return response.json();
    }else{
        return "error";
    }
};
export  const getAllCurretDebt= async (idUser) => {
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/api/v1/users/${idUser}/debtStatus`;
    const response = await fetch(url);
    //console.log(url)
    if (response.ok){
        return response.json();
    }else{
        return "error";
    }
}


export const addContribution = async (idAccount, contribution) => {
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/api/v1/users/${idAccount}`;
    const data = JSON.stringify(contribution)

    await fetch(url, {
        method: 'PUT',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
};
