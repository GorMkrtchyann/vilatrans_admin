import {Link} from "react-router-dom";
import {Images} from "../../assets/images/Images";
import {
    IconArrowRight,
    IconCircleFilled, IconCornerRightDown,
    IconLayoutDashboard,
    IconMath1Divide2,
    IconMessage
} from "@tabler/icons-react";
import {useState} from "react";
import {useNavigate} from "react-router";


const SidebarList = ({title, list, icon, setListMenu, selected}) => {
    const [open, setOpen] = useState(false)
    const [listItem, setListItem] = useState(-1)
    const navigate = useNavigate()

    const MainClick = (e) => {
        setListMenu(title)
    }

    const DefaultClick = (itemTitle) => {
        // setListMenu(title)
        navigate(`/dashboard/${title.toLowerCase()}/${itemTitle.toLowerCase()}`)
    }

    return(
        <li className={`sidebar-item ${selected ? 'selected' : ''}`} onClick={MainClick}>
            <div className="sidebar-link" onClick={() => {
                setOpen(!open)
                navigate(`/dashboard/${title.toLowerCase()}`)
            }} style={{cursor: "pointer", justifyContent: "space-between"}}>
                <div className={'sidebar-item__btn'}>
                    {icon}
                    <span className="hide-menu">{title}</span>
                </div>
                {
                    open ?
                        <IconCornerRightDown/>
                        :
                        <IconArrowRight/>
                }
            </div>

            {
                open ?
                    <ul className={'sidebar-item__list'}>
                        {
                            list?.map((el, i) => (
                                <li
                                    key={el+i}
                                    // className={listItem === i ? 'active' : ''}
                                    onClick={() => DefaultClick(el)}
                                ><IconCircleFilled size={8}/> {el}</li>
                            ))
                        }
                    </ul>
                    :
                    null
            }

        </li>
    )
}

export const Sidebar = () => {
    const [listMenu, setListMenu] = useState('')

    return (
        <div className={'sidebar--border'} style={{maxWidth: 280, minWidth: 280}}>
            <div className="brand-logo d-flex align-items-center justify-content-between">
                <Link to={'/'} className="text-nowrap logo-img">
                    <img src={Images.logo} width="180" alt=""/>
                </Link>
                <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                    <i className="ti ti-x fs-8"/>
                </div>
            </div>
            <nav className="sidebar-nav scroll-sidebar">
                <ul id="sidebarnav">
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"/>
                        <span className="hide-menu">Content</span>
                    </li>

                    <SidebarList
                        selected={listMenu === 'Pages'}
                        title={'Pages'}
                        icon={<IconLayoutDashboard/>}
                        list={['header', 'home', 'about', 'services', 'contact', 'footer']}
                        setListMenu={setListMenu}
                    />

                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"/>
                        <span className="hide-menu">Messages</span>
                    </li>

                    <div style={{display: "flex", flexDirection: "column", gap: 15}}>
                        <SidebarList setListMenu={setListMenu} selected={listMenu === 'Contact'} title={'Contact'} icon={<IconMessage/> } list={['reviews']}/>
                        <SidebarList setListMenu={setListMenu} selected={listMenu === 'Calculation'} title={'Calculation'} icon={<IconMath1Divide2/> } list={['Requests']}/>
                    </div>
                </ul>
            </nav>
            <button className={'btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2'}>Log Out</button>
        </div>
    )
}