export type RecordsResponse = {
    content: RecordItem[];
    totalPages: number;
}

export type RecordItem = {
    id: number,
    moment: string,
    name: string,
    age: number,
    gameTitle: string,
    gamePlatform: Plarform,
    genreName: string

}

export type Plarform = 'XBOX' | 'PC' | 'PLAYSTATION';
