import { setAuthResult } from "./auth-store";
import { AuthResult } from "../types/auth";

const login = async (username: string, password: string): Promise<void> => {
    try {
        const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 30,
            })
        });
        if(res.status == 200){
            const authResult:AuthResult = await res.json();
            setAuthResult(authResult);
        } else {
            throw new Error("Incorrect Username or Password");
        }
    } catch (error) {
        // Handle Error
        throw new Error("Incorrect Username or Password");
    }
};

const logout = (): void => {
    setAuthResult(null)
};

export { login, logout };