import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { ChangeEvent, MouseEvent, useState } from 'react'; 
import './Signup.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [verifyPassword, setVerifyPassword] = useState('')

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false); 

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setSubmitted(false); 
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setSubmitted(false); 
    }

    const handleVerifyPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setVerifyPassword(e.target.value);
        setSubmitted(false); 
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        if (email === '' || password === '' || verifyPassword === '') {
            setError(true);
        }
        else if (verifyPassword !== password) {
            setError(true);
        }
        else {
            setSubmitted(true); 
        }
    }

    return (
        <View style={styles.container}>
            <div>
                <h1>Hi there. Please create an account!</h1>
                <div>
                    `<form>
                        <label className="label">Email</label>
                        <input onChange={handleEmail} className="box input" value={email} type="text" />

                        <label className="label">Password</label>
                        <input onChange={handlePassword} className="box input" value={password} type="password" />

                        <label className="label">Verify Password</label>
                        <input onChange={handleVerifyPassword} className="box input" value={verifyPassword} type="password" />

                        <p>
                            Password must include:
                        </p>

                        <button onClick={handleSubmit} className="box btn" type="submit">Sign up</button>

            
                        
                    </form>`
                    <div>
                        Already have an account?  
                        &nbsp;<a href="url">Log in. </a>
                    </div>
                </div>
            </div>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
