import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function ResultTable() {
    
    const [jsonData, setJsondata] = useState([]);
    const [theaders, setTheaders] = useState([]);

    const fetchData = () => {
        return fetch("http://localhost:3000/txnDetails")
              .then((response) => response.json())
              .then((data) => {
                setJsondata(data)
                let tableHeader = [];
                data[0]['metadata'].forEach((element,index) => {
                    tableHeader.push(element['key'].toUpperCase());
                });
                setTheaders(tableHeader);  
            });
      }
    
      useEffect(() => {
        fetchData();
      },[])
   
  return (
    <div>
        <TableContainer component={Paper}>
            {
            jsonData.length !== 0 && theaders.length !== 0 ?  
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    {
                    theaders.map((tableH)=> (
                        <TableCell align="right">{tableH}</TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody> 
                {jsonData.map(row => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    {
                    row['metadata'].map((dataa)=>(
                        <TableCell align="right">{dataa['value']}</TableCell>
                    ))}                   
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            : <></>
        }
        </TableContainer>
    </div>
  )
}
