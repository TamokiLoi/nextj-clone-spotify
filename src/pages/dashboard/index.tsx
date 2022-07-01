import { Center, Meta, Player, Sidebar } from '@@components'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
    return (
        <>
            <Meta title={`Dashboard Page`} />
            <div className="bg-black h-screen overflow-hidden">
                <main className="flex">
                    <Sidebar />
                    <Center />
                </main>
                <div>
                    <Player />
                </div>
            </div>
        </>
    )
}

export default Dashboard
