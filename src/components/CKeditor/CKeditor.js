import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class CKeditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHtml: '',
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                dataHtml: this.props.value,
            });
        }
    }

    render() {
        const { handleEditorChange } = this.props;

        return (
            <div className="editor-container">
                <CKEditor
                    editor={ClassicEditor}
                    data={this.state.dataHtml}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        this.setState({
                            dataHtml: data,
                        });
                        handleEditorChange(data);
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CKeditor);
