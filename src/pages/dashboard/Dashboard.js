import {Sidebar} from "./sidebar";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {Breadcrumbs, Typography} from "@mui/material";
import {MenuWithCards} from "./MenuWithCards";
import {useEffect, useState} from "react";
import {HomeEdit} from "./pages/homeEdit/HomeEdit";


const DashboardContent = () => {
    const params = useParams()
    const [element, setElement] = useState(null)

    useEffect(() => {
        switch (params.item) {
            case 'home':
                return setElement(<HomeEdit/>)
        }
    }, [])

    return(element)
}

export const Dashboard = () => {
    const params = useParams()

    return (
        <div className="page-wrapper dashboard">
            <Sidebar/>

            <div className="right_page">
                <div className="right_page__breadcrumbs">
                    {
                        params.item ?
                            <>
                                <p>{params.type}</p>
                                <span>/</span>
                                <p className={'active'}>{params.item}</p>
                            </>
                            :
                            <>
                                <p className={'active'}>{params.type}</p>
                            </>
                    }
                </div>

                {
                    params.item ?
                        <DashboardContent/>
                        :
                        <MenuWithCards/>
                }

            </div>
        </div>
    )
}