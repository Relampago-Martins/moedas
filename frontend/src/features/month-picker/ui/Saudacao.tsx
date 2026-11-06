import { getCurrentUser } from '@/shared/api/endpoints/auth';
import { getBoasVindas } from '../lib/saudacao';

export async function Saudacao() {
    const user = await getCurrentUser();

    return (
        <div className="text-xl font-medium opacity-90 ">
            {getBoasVindas()}, {user.first_name || user.username}
        </div>
    );
}
