import React, { useEffect, useState } from 'react';
import Filters from '../../components/Filters'
import Chart from 'react-apexcharts';
import { barOptions } from './chart-options';
import { pieOptions } from './chart-options';
import axios from 'axios';
import { buildBarSeries, getPlatformChartData, getGenderChartData } from './helpers';
import './Styles.css';


type PieChartData = {
    labels: string[];
    series: number[];
}

type BarChartData = {
    x: string;
    y: number;
}

const initialPieData = {
    labels: [],
    series: []
}

const BASE_URL = 'https://sds1-eliasneri.herokuapp.com';

const Charts = () => {
    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
    const [genderData, setGenderData] = useState<PieChartData>(initialPieData);

    // INTEGRAÇÃO COM A API
useEffect( () => {
    async function getData(){
        const recordsReponse = await axios.get(`${BASE_URL}/records`); // passar sem parametros para trazer todos os dados
        const gamesResponse = await axios.get(`${BASE_URL}/games`);

        const barData = buildBarSeries(gamesResponse.data, recordsReponse.data.content);
        setBarChartData(barData);
        
        const platformData = getPlatformChartData(recordsReponse.data.content);
        setPlatformData(platformData);

        const genderChartData = getGenderChartData(recordsReponse.data.content);
        setGenderData(genderChartData);
    }

    getData();
}, [] )


return (
    <div className="page-container">
        <Filters link="/records" linkText="VER TABELA" />
        <div className="chart-container">
            <div className="top-related">
                <h1 className="top-related-title">
                    Jogos mais Votados
                </h1>
                <div className="games-container">
                    <Chart 
                       options={barOptions}
                       type="bar"
                       width="700"
                       height="500"
                       series={ [{ data: barChartData}] }

                    />
                </div>
            </div>
            <div className="charts">
                <div className="platform-chart">
                    <h2 className="chart-title">Plataformas</h2>
                    <Chart 
                     options={ { ...pieOptions, labels: platformData?.labels }}
                     type="donut"
                     series= {platformData?.series}
                     width="300"
                    />
                </div>
                <div className="gender-chart">
                    <h2 className="chart-title">Gêneros</h2>
                    <Chart
                     options= { { ...pieOptions, labels: genderData?.labels}}
                     type="donut"
                     series={ genderData?.series}
                     width="300"
                    /> 
                </div>
            </div>
        </div>
    
    
    </div>

)


}

export default Charts;
