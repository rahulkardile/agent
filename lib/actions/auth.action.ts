'use server';

import { db } from "@/firebase/admin";

export async function signUp( params: SignUpParams ){
    const { uid, name, email } = params;

    try {
    
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return {
                success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }

        await db.collection('user').doc(uid).set({
            name,
            email
        })


    } catch (error: any) {
        console.error('Error occuered while creating User, error : ', error);
            if(error.code === 'auth/email-already-exist'){
                return {
                    success: false,
                    message: 'This email is already in use.'
                }
            }

            return {
                success: false,
                message: 'failed to create an account.'
            }
    }

}