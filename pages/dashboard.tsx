import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSrAuth } from "../utils/withSSRAuth";
import { Can } from '../components/Can';

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    const userCanSeeMetrics = useCan({
        permissions: ['metrics.list']
    })

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <h1>Dashboard: {user?.email}</h1>

            <Can permissions={['metrics.list']}>
                Métricas
            </Can>
        </>
    );
}

export const getServerSideProps = withSSrAuth(async ctx => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/me');

    return {
        props: {}
    }
})