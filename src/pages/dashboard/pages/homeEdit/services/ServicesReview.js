import React, {useState} from 'react';
import {Link} from "react-router-dom";
import BasicTabs from "../LangSelect";
const ServicesReview = ({htmlContents, title}) => {
    const [lang, setLang] = useState('en');

    return (
        <div className={'services-side'}>
            <section className="section">
                <div className={'prev-lang'}>
                    <h4 style={{marginBottom: '50px', fontWeight: '400'}}>Services Preview</h4>
                    <BasicTabs setLang={setLang}/>
                </div>
                <div className="container">
                    <div className="row bottom-70">
                        <div className="col-lg-4">
                            <div className="heading bottom-40"><span className="heading__pre-title">Services</span>
                                <h3 className="heading__title">{title[`title-${lang}`]}</h3><span
                                    className="heading__layout">Services</span>
                            </div>
                            <Link className="button button--green d-none d-lg-inline-block"
                                  to="#"><span>All services</span>
                                <svg className="icon">
                                    <use xlinkHref="#arrow"></use>
                                </svg>
                            </Link>
                        </div>
                        <div className="col-lg-8">
                            <div dangerouslySetInnerHTML={{ __html: htmlContents[lang + '1'] }}></div>
                            <div dangerouslySetInnerHTML={{ __html: htmlContents[lang + '2'] }} className="bottom-0"></div>
                        </div>
                    </div>
                    <div className="row top-70 d-flex d-lg-none">
                        <div className="col-12 text-center"><Link className="button button--green" to="#"><span>All services</span>
                            <svg className="icon">
                                <use xlinkHref="#arrow"></use>
                            </svg>
                        </Link></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServicesReview;