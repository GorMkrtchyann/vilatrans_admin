import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Editor} from "react-draft-wysiwyg";
import {useState} from "react";
import {IconPalette} from "@tabler/icons-react";
import {BlockPicker} from "react-color";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ColorPic = ({ expanded, onExpandEvent, onChange, currentState }) => {
    const [open, setOpen] = useState(false)
    const { color } = currentState;

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const onChanging = (color) => {
        onChange('color', color.hex);
    }

    return(
        <div
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-label="rdw-color-picker"
            className={'editorColorPicker_btn'}
            title={'Color'}
        >
            <div
                onClick={() => {
                    onExpandEvent()
                    setOpen(!open)
                }}
                className={'editorBtn'}
                style={{marginLeft: 5}}
            >
                <IconPalette stroke={1.2}/>
            </div>
            {
                open ?
                    <div
                        onClick={stopPropagation}
                        className={'editorColorPicker'}
                    >
                        <BlockPicker color={color} onChangeComplete={onChanging} />
                    </div>
                    : null
            }
        </div>
    )
}

export default function AccordionUsage({text, onEditorStateChange, editorState, lang}) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    {text}
                </AccordionSummary>
                <AccordionDetails>
                    <Editor
                        wrapperClassName="editor-wrapper"
                        editorClassName="editor-editor"
                        toolbarClassName='editor-toolbar'
                        editorState={editorState}
                        onEditorStateChange={(newEditorState) => onEditorStateChange(newEditorState, lang)}
                        toolbar={{
                            options: ['inline', 'list', 'colorPicker'],
                            inline: {
                                options: ['bold', 'italic', 'underline', 'strikethrough'],
                                bold: {className: 'editorBtn'},
                                italic: {className: 'editorBtn'},
                                underline: {className: 'editorBtn'},
                                strikethrough: {className: 'editorBtn'},
                            },
                            list: {
                                options: ['ordered', 'unordered'],
                                ordered: {className: 'editorBtn'},
                                unordered: {className: 'editorBtn'},
                            },
                            colorPicker: {
                                component: ColorPic,
                            }
                        }}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}