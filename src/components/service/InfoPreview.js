import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React from "react";

export const InfoPreview = ({ data, inputValues, language, editorValues }) => {
    return (
        <div className="page-wrapper services main">
            <section className="section">
                <div className="container">
                    <div className="row flex-column-reverse flex-lg-row">
                        <div className="col-lg-6 top-50 top-lg-0">
                            <div className="heading bmb-9">
                                <h3 className="heading__title">
                                    {inputValues[language] || data.title[language]}
                                </h3>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: editorValues[language].getCurrentContent().hasText()
                                        ? draftToHtml(
                                            convertToRaw(editorValues[language].getCurrentContent())
                                        )
                                        : draftToHtml(data.description[language]),
                                }}
                                className="bottom-0 mt-3"
                            ></div>
                        </div>
                        <div className="col-lg-6 col-xl-5 offset-xl-1">
                            <img className="w-100" src={data.images} alt="img" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
