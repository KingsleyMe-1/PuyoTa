import { ReactNode } from 'react'
import Navbar from '../shared/components/NavBar';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-dvh flex flex-col"
            style={{ background: "var(--color-listings-bg)" }}>
            <Navbar authentication={true} />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout