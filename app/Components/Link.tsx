import NextLink from 'next/link'
import { Link as RedixLink } from "@radix-ui/themes";
import React, { ReactNode } from 'react'


interface Props {
    href: string
    children: ReactNode
}

const Link = ({ href, children }: Props) => {
    return (
        <NextLink passHref legacyBehavior href={href}>
            <RedixLink>
                {children}
            </RedixLink>
        </NextLink>
    )
}

export default Link