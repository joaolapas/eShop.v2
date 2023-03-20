export const url = 'https://e-shop-backend-iqfp71ltt-joaolapas.vercel.app/api'


export const setHeaders = () => {
    const headers ={
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }
    return headers;
}