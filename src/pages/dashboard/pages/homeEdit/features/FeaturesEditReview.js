import React, {useState} from 'react';
import BasicTabs from "../LangSelect";

const FeaturesEditReview = ({reqData, htmlContents}) => {
    const [lang, setLang] = useState('en');

    return (
        <div className={'features-review'}>
            <div className={'lang-features-review'}>
                <h3>Features Preview</h3>
                <BasicTabs setLang={setLang}/>
            </div>
            <div className="features-section home-2 border-top">
                <div className="container">
                    <div className="row feature-content">
                        <div className="col-xl-5 offset-xl-7 col-lg-6 offset-lg-6 pr-0">
                            <div className="features">
                                <span className="title">Features</span>
                                <h2 className="subtitle">{reqData ? reqData.title[lang] : null}</h2>
                                <div className="feature-lists">
                                    <div className="single-feature wow fadeInUp" data-wow-duration="1s">
                                        <div className="icon-wrapper"><img src={reqData ? reqData.section1.icon : null} alt="icon"/></div>
                                        <div className="feature-details">
                                            <h4>{reqData ? reqData.section1.title[lang] : null}</h4>
                                            <div dangerouslySetInnerHTML={{ __html: htmlContents[`${lang}1`] }}></div>
                                        </div>
                                    </div>
                                    <div className="single-feature wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                                        <div className="icon-wrapper"><img src={reqData ? reqData.section2.icon : null} alt="icon"/></div>
                                        <div className="feature-details">
                                            <h4>{reqData ? reqData.section2.title[lang] : null}</h4>
                                            <div dangerouslySetInnerHTML={{ __html: htmlContents[`${lang}2`] }}></div>
                                        </div>
                                    </div>
                                    <div className="single-feature wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                                        <div className="icon-wrapper"><img src={reqData ? reqData.section3.icon : null} alt="icon"/></div>
                                        <div className="feature-details">
                                            <h4>{reqData ? reqData.section3.title[lang] : null}</h4>
                                            <div dangerouslySetInnerHTML={{ __html: htmlContents[`${lang}3`] }}></div>
                                        </div>
                                    </div>
                                </div>
                                <img className={'features-img'} src={reqData ? reqData.image : ''} alt="img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturesEditReview;