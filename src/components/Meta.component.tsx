import Head from 'next/head';
import React from 'react'

type Props = {
    title?: string;
    description?: string;
    image?: string;
}

const Meta = ({ title, description, image }: Props) => {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}

export default Meta