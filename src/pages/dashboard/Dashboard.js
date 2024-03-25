import {Sidebar} from "./sidebar";
import {useParams} from "react-router";
import {MenuWithCards} from "./MenuWithCards";
import {useEffect, useState} from "react";
import {HomeEdit} from "./pages/homeEdit/HomeEdit";
import {Reviews} from "./pages/reviews/Reviews";
import {Requests} from "./pages/requests/Requests";
import {ContactEdit} from "./pages/contactEdit/ContactEdit";
import {HeaderEdit} from "./pages/headerEdit/HeaderEdit";
import {FooterEdit} from "./pages/footerEdit/FooterEdit";
import { ServicePage } from "./pages/servicePage/Service";
import {Calculator} from "../dashboard/pages/calculator/Calculator"

const DashboardContent = () => {
    const params = useParams()
    const [element, setElement] = useState(null)

    useEffect(() => {
        switch (params.item) {
            case 'header':
                return setElement(<HeaderEdit/>)
            case 'footer':
                return setElement(<FooterEdit/>)
            case 'home':
                return setElement(<HomeEdit/>)
            case 'contact':
                return setElement(<ContactEdit/>)
            case 'reviews':
                return setElement(<Reviews/>)
            case 'requests':
                return setElement(<Requests/>)
                return setElement(<HomeEdit />)
            case 'reviews':
                return setElement(<Reviews />)
            case 'calculator':
                return setElement(<Calculator />)
            case 'services':
                return setElement(<ServicePage />)
        }
    }, [params.item])

    return (element)
}

export const Dashboard = () => {
    const params = useParams()

    return (
        <div className="page-wrapper dashboard">
            <Sidebar />

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
                        <DashboardContent />
                        :
                        <MenuWithCards />
                }

            </div>
        </div>
    )
}