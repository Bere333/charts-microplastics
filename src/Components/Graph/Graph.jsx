import React, {useEffect, useState} from 'react';
import Input from '../Input/Input';
import Button from '../../Utils/Button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Graph() {
    const [dataSet, setDataSet] = useState([]);
    const [cities, setCities] = useState([]);
    const [filterCities, setFilterCities] = useState([]);
    const [indicatorOne, setIndicatorOne] = useState([]);
    const [indicatorTwo, setIndicatorTwo] = useState([]);
    
    useEffect(() => {
        // Es necesario correr la api primero
        const url = "http://127.0.0.1:5000/countries";
        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(response => response.json())
        .then((data) => {
            setDataSet(data);
            for (var prop in data[0]) {
                if (prop === "Ciudades") {
                    setCities(data[0][prop]);
                }
                if (prop === "Indicador_1") {
                    setIndicatorOne(data[0][prop]);
                }
                if (prop === "Indicador_2") {
                    setIndicatorTwo(data[0][prop]);
                }
            }
        });
    },[]);

    // Elementos de la gráfica
  
    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'bottom' ,
        },
        title: {
            display: true,
            text: 'Gráfica de indicadores',
        },
        },
    };

    const labels = filterCities;
    
    const data = {
        labels,
        datasets: [
        {
            label: 'Indicador 1',
            data: indicatorOne,
            backgroundColor: 'rgb(20,47,88)',
        },
        {
            label: 'Indicador 2',
            data: indicatorTwo,
            backgroundColor: 'rgb(240,173,25)',
        },
        ],
    };

    const handleCities = (nameCity) => {
        const isInclude = filterCities.includes(nameCity);
        if (!isInclude) {
            setFilterCities((allCities) =>[...allCities, nameCity]);
        }else{
            const filterCity = filterCities.filter(city => city !== nameCity);
            setFilterCities(filterCity);
        }
    };

    const downloadPDF = async() => {
        const pdf = new jsPDF("portrait", "pt", "a4"); 
        const data = await html2canvas(document.querySelector("#pdf"));
        const img = data.toDataURL("image/png");
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("graph.pdf");

    };
    
    const downloadIMG = async() => {
        var img = document.createElement('a');
        const data = await html2canvas(document.querySelector("#pdf"));
        img.href = data.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        img.download = 'graph.jpg';
        img.click();
    };

    return (
        <div    
            style={{
                "width":"100%",
                "height":"auto",
                "display":"flex",
                "flexDirection":"row",
            }}
        >
            <div
                style={{
                    "width":"30%",
                    "display":"flex",
                    "flexDirection":"column",
                    "alignContent":"center",
                    "alignItems":"center",
                }}
            >
                <div
                    style={{
                        "width":"60%",
                        "height":"60%",
                        "backgroundColor":"#142F58",
                        "padding":"1rem 1rem",
                        "color":"white",
                        "display":"flex",
                        "flexDirection":"column",
                        "alignContent":"rigth",
                        "alignItems":"initial",
                        "boxShadow": "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                    }}
                >
                    <h3
                        style={{
                            "padding":"0 0",
                            "margin":"0 0"
                        }}
                    >Filtrar ciudades</h3>
                    <p>Seleccione las ciudades que desea observar en la gráfica:</p>
                    <ul
                        style={{
                            "textDecoration":"none",
                            "listStyleType": "none",
                            "margin":"0 0",
                            "alignItems":"initial"
                        }} 
                    >
                        {
                            cities.map((city,index)=>{
                                return(
                                    <li 
                                        key={index}
                                        onChange={()=>{
                                            handleCities(city);
                                        }}
                                    >
                                        <Input
                                            id={index}
                                        />
                                            {city}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div
                    style={{
                        "width":"100%",
                        "height":"40%",
                        "padding":"3vh 0",
                        "display":"flex",
                        "flexDirection":"column",
                        "alignItems":"center",
                        "alignContent":"space-between"

                        
                    }}
                >
                    <Button
                        title="Descargar pdf"
                        downloadFunction={()=>{
                            downloadPDF()
                        }}
                    />
                    <Button
                        title="Descargar imagen"
                        downloadFunction={()=>{
                            downloadIMG()
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    "width":"70%",
                    "padding":"1rem 0rem"
                }}
                id="pdf"
            >
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}

export default Graph;



