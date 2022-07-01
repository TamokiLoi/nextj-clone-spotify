import { Meta } from '@@components';
import { ROUTES } from '@@constants';
import { GetServerSideProps, NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';

const Login: NextPage = ({ providers }: any) => {
    return (
        <>
            <Meta title={`Login Page`} />
            <div className="flex flex-col items-center bg-black
                min-h-screen w-full justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="w-52 mb-5"
                    src="https://links.papareact.com/9xl"
                    alt="logo-spotify"
                />
                {Object.values(providers).map((provider: any) => (
                    <div key={provider.name}>
                        <button
                            onClick={() => signIn(provider.id, { callbackUrl: ROUTES.DASHBOARD })}
                            className="bg-[#18D860] text-white p-5 rounded-full">
                            Login with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders();
    return {
        props: {
            providers
        },
    };
};

export default Login