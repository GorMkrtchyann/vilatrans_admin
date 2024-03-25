import {Link} from "react-router-dom";
import {
    IconBrandAzure, IconCalculator,
    IconHome,
    IconInfoSquareRounded,
    IconLayoutBottombar,
    IconMessage,
    IconPhone,
} from "@tabler/icons-react";
import {useParams} from "react-router";

const Menus = {
    pages: [
        {icon: <IconHome />, title: 'Home'},
        {icon: <IconInfoSquareRounded />, title: 'about'},
        {icon: <IconBrandAzure />, title: 'services'},   
        {icon:<IconCalculator/>, title:'Calculator'},
        {icon: <IconPhone />, title: 'contact'},
        {icon: <IconLayoutBottombar />, title: 'footer'},
    ],
    contact: [
        {icon: <IconMessage />, title: 'reviews'},
    ],
    calculation: [
        {icon: <IconCalculator />, title: 'Requests'},
    ],
}

export const MenuWithCards = () => {
    const params = useParams()

    return(
        <div className={'right_page__menuCards'}>

            {
                Menus[params.type]?.map((el, i) => (
                    <Link key={i} to={'/'} className="right_page__menuCards__card">
                        {el.icon}
                        <span>{el.title}</span>
                    </Link>
                ))
            }
        </div>
    )
}