/*
Cria uma mensagem de boas vindas de acordo com o horário do dia
- Bom dia: 05:00 às 11:59
- Boa tarde: 12:00 às 17:59
- Boa noite: 18:00 às 04:59
*/
export function getBoasVindas(){
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const time = hours + (minutes / 60);
    if (time >= 5 && time < 12) return 'Bom dia';
    if (time >= 12 && time < 18) return 'Boa tarde';
    return 'Boa noite';
}