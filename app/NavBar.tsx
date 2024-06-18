'use client'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBugSharp } from "react-icons/io5";

const NavBar = () => {
    return (
        <Container>
            <NavLinks />
        </Container>
    )
}

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ]
    return (
        <nav className=' border-b mb-5 px-5 h-14 py-3' >
            <Flex justify="between">
                <Flex align="center" gap="3">
                    <Link href="/"><IoBugSharp /></Link>
                    <ul className='flex space-x-6'>
                        {links.map(({ label, href }) => (
                            <li key={label}>
                                <Link className={classNames({
                                    'nav-link': true,
                                    '!text-zinc-900': currentPath === href,
                                })} href={href}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Flex>
                <AuthStatus />
            </Flex>
        </nav >)
}

const AuthStatus = () => {
    const { status, data: session } = useSession();
    if (status === 'loading') return null;
    if (status === 'unauthenticated') return <Link className='nav-link' href="/api/auth/signin">Sign In</Link>;

    return (<Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar src={session!.user!.image!} fallback="?" size="2" radius="full" className='cursor-pointer' referrerPolicy="no-referrer" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text>
                        {session!.user!.email!}
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Sign Out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>
    )
}

export default NavBar