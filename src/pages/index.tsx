import { ImageLoader, Meta } from '@@components';
import { ROUTES } from '@@constants';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(ROUTES.DASHBOARD);
    }, []);

    return (
        <>
            <Meta title={`Home Page`} />
            <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
                <div className="relative w-52 h-52">
                    <ImageLoader layout="fill" alt={`logo-spotify`} />
                </div>
            </div>
        </>
    )
}

export default Home