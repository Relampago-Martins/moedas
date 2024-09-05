export function list2Ul(list: string[] | undefined) {
    return list?.map((item, index) => {
        return <li key={index}>{item}</li>
    });
}