'use client'
import { Box, Container, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBugSharp } from "react-icons/io5";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ]
    const { status, data: session } = useSession();
    return (
        <Container>
            <nav className=' border-b mb-5 px-5 h-14 py-3'>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/"><IoBugSharp /></Link>
                        <ul className='flex space-x-6'>
                            {links.map(({ label, href }) => (
                                <li key={label}>
                                    <Link className={classNames({
                                        'text-zinc-900': currentPath === href,
                                        'text-zinc-500': currentPath !== href,
                                        'hover:text-zinc-900 transition-colors': true,
                                    })} href={href}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>

                    <Box>
                        {status === 'authenticated' && (<Link href="/api/auth/signout">Sign Out</Link>)}
                        {status === 'unauthenticated' && (<Link href="/api/auth/signin">Sign In</Link>)}
                    </Box>
                </Flex>
            </nav >
        </Container>
    )
}

export default NavBar