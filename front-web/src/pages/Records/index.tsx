import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RecordsResponse } from './types';
import { formatDate } from './Helpers';
import Filters from '../../components/Filters';
import Pagination from './Pagination'

import './styles.css';

const BASE_URL = 'https://sds1-eliasneri.herokuapp.com';

const Records = () => {     // necessário para criar as lógicas para o código funcionar
    const [recordsResponse, serRecordsResponse] = useState<RecordsResponse>();
    console.log(recordsResponse);
    
    const [activePage, setActivePage] = useState(0);

    // para buscar as informações no endpoint da API.
    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
        .then(response => serRecordsResponse(response.data));
    }, [activePage]);

    // método
    const handlePageChange = (index: number) => {
        setActivePage(index)
    }

return (
    <div className="page-container">
        <Filters link="/charts" linkText="VER GRÁFICOS" />
                <table className="records-table" cellPadding="0" cellSpacing="0">
            <thead>
                <tr>
                    <th>INSTANTE</th>
                    <th>NOME</th>
                    <th>IDADE</th>
                    <th>PLATAFORMA</th>
                    <th>GÊNERO</th>
                    <th>TÍTULO DO GAME</th>
                </tr>
            </thead>
            <tbody>
                {recordsResponse?.content.map(record => (                 
                    <tr key ={record.id}>
                        <td>{formatDate(record.moment)}</td>
                        <td>{record.name}</td>
                        <td>{record.age}</td>
                        <td className="text-secondary">{record.gamePlatform}</td>
                        <td>{record.genreName}</td>
                        <td className="text-primary">{record.gameTitle}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination 
            activePage={activePage}
            goToPage={handlePageChange}
            totalPages={recordsResponse?.totalPages}
            />
    </div>

);
}

export default Records;