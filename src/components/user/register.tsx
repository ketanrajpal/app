import { useState, ChangeEvent, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { isArray } from '@apollo/client/utilities'

const createUserMutation = gql`
    mutation CreateUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
        $terms: Boolean!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            terms: $terms
        ) {
            _id
            firstName
            lastName
            email
            terms
            createdAt
            updatedAt
            lastLogin
            active
        }
    }
`

export const RegisterForm = () => {
    const [createUser] = useMutation(createUserMutation)

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        terms: false,
    })

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        terms: '',
    })

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        createUser({
            variables: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                terms: user.terms,
            },
        }).catch((error) => {
            if (error.graphQLErrors.length > 0) {
                error.graphQLErrors.map(
                    ({
                        message,
                    }: {
                        message: {
                            code: string
                            field: string
                            message: string
                        }[]
                    }) => {
                        message.map(
                            ({
                                code,
                                field,
                                message,
                            }: {
                                code: string
                                field: string
                                message: string
                            }) => {
                                setErrors((errors) => ({
                                    ...errors,
                                    [field]: message,
                                }))
                            }
                        )
                    }
                )
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                />
                <span>{errors.firstName}</span>
            </div>
            <div>
                <label htmlFor="lastName">Last name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                />
                <span>{errors.lastName}</span>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <span>{errors.email}</span>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <span>{errors.password}</span>
            </div>
            <div>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="terms">Terms</label>
                <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={user.terms}
                    onChange={() => setUser({ ...user, terms: !user.terms })}
                />
                <span>{errors.terms}</span>
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
            {JSON.stringify(errors)}
        </form>
    )
}
