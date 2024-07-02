import { useEffect, useState } from "react";

const useFetchData = () => {
    const[data,setData]=useState(null)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(false)


    useEffect(()=>{
        FetchData()
    },[])

    const FetchData=async()=>{
        try{
            setLoading(true)
        const api=await fetch("https://dummyjson.com/products?limit=100");
        const response=await api.json()
        setData(response)
        setLoading(false)
        }

        catch(err){
            setError(true)
            setLoading(false)
        }
    }
  return {data,loading,error}
}

export default useFetchData