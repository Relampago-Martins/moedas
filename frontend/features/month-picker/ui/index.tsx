import { authConfig } from '@/shared/lib/auth';
import { getUser } from '@/shared/lib/fetchAPI';
import { MySession } from '@/types/auth';
import { getServerSession } from 'next-auth';
import { getBoasVindas } from '../lib/greets';
import { MonthPickerInput } from './MonthPickerInput';

type PropsMonthPicker = {
    className?: string;
};

export async function MonthPicker(props: PropsMonthPicker) {
    const session = (await getServerSession(authConfig)) as MySession;
    const user = await getUser(session?.apiKey);

    return (
        <div
            className={`flex items-center justify-between gap-4 ${props.className}`}
        >
            <div className="text-xl font-medium opacity-90 ">
                {getBoasVindas()}, {user.data.first_name || user.data.username}
            </div>
            <MonthPickerInput />
        </div>
    );
}
