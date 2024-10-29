import React, {useEffect, useState} from "react";


const getCertificationById =  async (id) => {


    try {
        const response = await fetch('http://localhost:8000/certificaciones/${id}');

        if(!response.ok) {
            throw new Error("Error obteniendo la información");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        
        console.error("Error fetching certification data: ", error);
        throw error;
    }


  
};

export default getCertificationById;