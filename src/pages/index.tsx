import { Meta } from '@@components';
import { ROUTES } from '@@constants';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(ROUTES.DASHBOARD);
    })

    return (
        <>
            <Meta title={`Home Page`} />
            <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="w-52 mb-5"
                    src="https://links.papareact.com/9xl"
                    alt="logo-spotify"
                />
            </div>
        </>
    )
}

export default Home