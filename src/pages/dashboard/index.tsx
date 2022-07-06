import { Center, Meta, Player, Sidebar } from '@@components';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

type Props = {
    session: any
}

const Dashboard = ({ session }: Props) => {
    return (
        <>
            <Meta title={`Dashboard Page`} />
            <div className="bg-black h-screen overflow-hidden">
                <main className="flex">
                    <Sidebar />
                    <Center />
                </main>
                <div className="sticky bottom-0">
                    <Player />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    return {
        props: {
            session
        },
    };
};

export default Dashboard
