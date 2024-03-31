import { authConfig } from '@/shared/lib/auth';
import { getUser } from '@/shared/lib/fetchAPI';
import { MySession } from '@/types/auth';
import { getServerSession } from 'next-auth';
import { MonthPickerInput } from './MonthPickerInput';
import { Saudacao } from './saudacao';

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
            <Saudacao user={user.data} />
            <MonthPickerInput />
        </div>
    );
}
