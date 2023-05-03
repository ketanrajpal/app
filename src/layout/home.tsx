import { ReactElement } from 'react'
import Link from 'next/link'

const HomeLayout = ({ children }: { children: ReactElement }) => {
    return (
        <>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/register">Register</Link>
                </li>
            </ul>
            {children}
        </>
    )
}

export default HomeLayout
